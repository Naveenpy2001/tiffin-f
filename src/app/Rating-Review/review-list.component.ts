import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { Review, ReviewDTO, ReviewComment, ReviewCommentDTO, ReviewService} from '../sharingdata/services/reviews.service'

@Component({
  selector: 'app-rating-review',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewRatingComponent implements OnInit {
  reviewForm: FormGroup;
  imageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  reviews: Review[] = [];
  currentRating = 0;
  hoveredRating = 0;
  commentInputs: { [key: number]: string } = {};
  mealId = 1; // Replace with real mealId
  userId = 1; // Replace with real userId
  orderId = 1; // Replace with real orderId

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {
    this.reviewForm = this.fb.group({
      reviewText: ['', Validators.required],
      rating: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getReviewsByMeal(this.mealId).subscribe(res => {
      this.reviews = res;
    });
  }

  onStarClick(rating: number) {
    this.currentRating = rating;
    this.reviewForm.controls['rating'].setValue(rating);
  }

  onStarHover(rating: number) {
    this.hoveredRating = rating;
  }

  onStarLeave() {
    this.hoveredRating = 0;
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  submitReview() {
    if (this.reviewForm.invalid) return;

    const review: ReviewDTO = {
      userId: this.userId,
      mealId: this.mealId,
      orderId: this.orderId,
      rating: this.reviewForm.value.rating,
      comment: this.reviewForm.value.reviewText,
      photoUrls: this.imagePreview ? [this.imagePreview.toString()] : [],
      status: 'APPROVED'
    };

    this.reviewService.addReview(review).subscribe(() => {
      this.reviewForm.reset();
      this.imagePreview = null;
      this.currentRating = 0;
      this.loadReviews();
    });
  }

  likeReview(review: Review) {
    review.likes++;
    // You can call backend like `this.reviewService.likeReview(review.id)` if API exists
  }

  addComment(review: Review) {
    const comment = this.commentInputs[review.id];
    if (!comment?.trim()) return;

    const commentDTO: ReviewCommentDTO = {
      userId: this.userId,
      reviewId: review.id,
      comment,
      status: 'APPROVED'
    };

    this.reviewService.addComment(commentDTO).subscribe(() => {
      review.comments.push({ ...commentDTO, id: Date.now() }); // push temporary
      this.commentInputs[review.id] = '';
    });
  }

  share(review: Review) {
    alert('Sharing review on social media!');
  }

  get communityFavorites(): Review[] {
    return this.reviews.sort((a, b) => b.likes - a.likes).slice(0, 3);
  }

   shareOnInstagram() {
  if (navigator.share) {
    navigator.share({
      title: 'Check out my meal!',
      text: 'Loved this dish 🍽️!',
      url: this.imagePreview as string
    }).catch(err => console.error('Share failed:', err));
  } else {
    alert('Sharing not supported on this device/browser.');
  }
}
}