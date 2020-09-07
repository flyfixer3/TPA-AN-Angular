"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommentComponent = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var watch_content_component_1 = require("../watch-content/watch-content.component");
var CommentComponent = /** @class */ (function () {
    function CommentComponent(dateService, videoDetailsService, apollo, userService, router) {
        var _this = this;
        this.dateService = dateService;
        this.videoDetailsService = videoDetailsService;
        this.apollo = apollo;
        this.userService = userService;
        this.router = router;
        this.likesCount = 0;
        this.dislikesCount = 0;
        this.feedback = null;
        this.replyComment = {
            user_id: "3d9dccc5-a7ee-4257-9391-459ba59fac87",
            video_id: "0002befd-49f8-4e57-bfcd-c086c3babed2",
            parent_id: "4b621a11-fc7c-466a-a749-481620411b53",
            reply_to: "onymyway",
            comment: "For Godsake, WTH !"
        };
        this.hide = true;
        this.userService.currentUserValueChange.subscribe(function (value) {
            _this.checkCurrentUserFeedBack();
        });
    }
    CommentComponent.prototype.ngOnInit = function () {
        this.diffDate = this.dateService.calculateDifference(this.comment.created_at);
        this.checkOtherFeedbacks();
        this.currentUser = this.userService.getCurrentUser();
        if (this.currentUser) {
            this.checkCurrentUserFeedBack();
        }
    };
    CommentComponent.prototype.showHideReply = function () {
        if (!this.hide) {
            this.hide = true;
        }
        else
            this.hide = false;
    };
    CommentComponent.prototype.giveFeedback = function (feedback) {
        var isFeedbackBeforeGood = this.feedback == "like" ? true : false;
        console.log(this.feedback);
        console.log(feedback);
        if (this.currentUser) {
            if (!this.feedback) {
                this.insertFeedbackComment(feedback);
            }
            else if (isFeedbackBeforeGood == feedback) {
                console.log("dekeete");
                this.deleteFeedbackComment();
            }
            else {
                console.log("updateee");
                this.updateFeedbackComment(feedback);
            }
        }
    };
    CommentComponent.prototype.insertFeedbackComment = function (feedback) {
        this.apollo.mutate({
            mutation: graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["mutation createFeedBackOnComment(\n          $user_id: String! \n          $comment_id: String! \n          $status: Boolean!\n        ){\n        createFeedBackOnComment(\n          input:{\n            user_id: $user_id,\n            comment_id: $comment_id,\n            status: $status\n        }\n        ){\n          status\n        }\n      }"], ["mutation createFeedBackOnComment(\n          $user_id: String! \n          $comment_id: String! \n          $status: Boolean!\n        ){\n        createFeedBackOnComment(\n          input:{\n            user_id: $user_id,\n            comment_id: $comment_id,\n            status: $status\n        }\n        ){\n          status\n        }\n      }"]))),
            variables: {
                user_id: this.currentUser.id,
                comment_id: this.comment.id,
                status: feedback
            },
            refetchQueries: [{
                    query: watch_content_component_1.queryGetCommentsByVideoId,
                    variables: { id: this.comment.video_id, repoFullName: 'apollographql/apollo-client' }
                }]
        }).subscribe();
    };
    CommentComponent.prototype.deleteFeedbackComment = function () {
        this.apollo.mutate({
            mutation: graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["mutation deleteFeedBackOnComment(\n          $user_id: String! \n          $comment_id: String! \n        ){\n        deleteFeedbackOnComment(\n          user_id: $user_id,\n          comment_id: $comment_id\n        )\n      }"], ["mutation deleteFeedBackOnComment(\n          $user_id: String! \n          $comment_id: String! \n        ){\n        deleteFeedbackOnComment(\n          user_id: $user_id,\n          comment_id: $comment_id\n        )\n      }"]))),
            variables: {
                user_id: this.currentUser.id,
                comment_id: this.comment.id
            },
            refetchQueries: [{
                    query: watch_content_component_1.queryGetCommentsByVideoId,
                    variables: { id: this.comment.video_id, repoFullName: 'apollographql/apollo-client' }
                }]
        }).subscribe();
    };
    CommentComponent.prototype.updateFeedbackComment = function (feedback) {
        this.apollo.mutate({
            mutation: graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["mutation updateFeedBackOnComment(\n          $user_id: String! \n          $comment_id: String! \n          $status: Boolean!\n        ){\n        updateFeedbackOnComment(\n          input:{\n            user_id: $user_id,\n            comment_id: $comment_id,\n            status: $status\n        })\n      }"], ["mutation updateFeedBackOnComment(\n          $user_id: String! \n          $comment_id: String! \n          $status: Boolean!\n        ){\n        updateFeedbackOnComment(\n          input:{\n            user_id: $user_id,\n            comment_id: $comment_id,\n            status: $status\n        })\n      }"]))),
            variables: {
                user_id: this.currentUser.id,
                comment_id: this.comment.id,
                status: feedback
            },
            refetchQueries: [{
                    query: watch_content_component_1.queryGetCommentsByVideoId,
                    variables: { id: this.comment.video_id, repoFullName: 'apollographql/apollo-client' }
                }]
        }).subscribe();
    };
    CommentComponent.prototype.checkCurrentUserFeedBack = function () {
        var _this = this;
        this.feedback = null;
        this.currentUser = this.userService.getCurrentUser();
        var feedbacks = this.comment.like_comment;
        console.log("succes!!!!");
        console.log(this.currentUser);
        console.log(feedbacks);
        feedbacks.forEach(function (element) {
            if (element.user_id == _this.currentUser.id) {
                if (element.status) {
                    _this.feedback = "like";
                }
                else {
                    _this.feedback = "dislike";
                }
            }
        });
    };
    CommentComponent.prototype.checkOtherFeedbacks = function () {
        var _this = this;
        this.feedback = null;
        var feedbacks = this.comment.like_comment;
        console.log("testsadas");
        console.log(this.feedback);
        feedbacks.forEach(function (element) {
            if (element.status) {
                _this.likesCount++;
            }
            else {
                _this.dislikesCount++;
            }
        });
    };
    CommentComponent.prototype.createComment = function () {
        this.replyComment.user_id = this.currentUser.id.toString();
        this.replyComment.video_id = this.comment.video_id.toString();
        this.replyComment.parent_id = this.comment.parent_id ? this.comment.parent_id.toString() : this.comment.id.toString();
        this.replyComment.reply_to = this.comment.parent_id ? this.comment.user.name.toString() : "";
        this.replyComment.comment = this.inputComment;
        console.log(this.replyComment);
        this.insertComment();
    };
    CommentComponent.prototype.insertComment = function () {
        this.apollo.mutate({
            mutation: graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["mutation insertComment($newComment: NewComment!){\n        createComment(input: $newComment\n        ){\n          id\n        }\n      }"], ["mutation insertComment($newComment: NewComment!){\n        createComment(input: $newComment\n        ){\n          id\n        }\n      }"]))),
            variables: {
                newComment: this.replyComment
            },
            refetchQueries: [{
                    query: watch_content_component_1.queryGetCommentsByVideoId,
                    variables: { id: this.comment.video_id, repoFullName: 'apollographql/apollo-client' }
                }]
        }).subscribe();
    };
    __decorate([
        core_1.Input()
    ], CommentComponent.prototype, "comment");
    CommentComponent = __decorate([
        core_1.Component({
            selector: 'app-comment',
            templateUrl: './comment.component.html',
            styleUrls: ['./comment.component.sass']
        })
    ], CommentComponent);
    return CommentComponent;
}());
exports.CommentComponent = CommentComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
