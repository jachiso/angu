import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { CommentService } from "./comment.service";
import { SaucerService } from '../saucers/saucer.service'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [CommentService, SaucerService]
})
export class CommentsComponent implements OnInit, OnDestroy {

  private saucerId: string;
  private subscription: Subscription;

  private saucer = {};
  private comments = [];
data = {};

commentSucess: Boolean; 
commentError: Boolean;

  constructor(private route: ActivatedRoute,
              private commentService: CommentService,
              private saucerService: SaucerService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.saucerId = params.id;

        this.commentService.getComments(this.saucerId)
            .then(response => this.comments = response);

        this.saucerService.getSaucer(this.saucerId)
            .then(response => this.saucer = response);
    }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

sendComment(e){
  this.commentService.sendComment(this.saucerId, this.data)
  .then(response => {
    console.log(this.data);
    this.comments.push(response);
    this.data = {};

    this.commentSucess=true;
    this.commentError=false;
  })
  .catch(response => {
  this.commentSucess=false;
    this.commentError=true;
  });
}

}
