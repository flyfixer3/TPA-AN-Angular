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
exports.queryGetVideos = exports.queryGetCommentsByVideoId = exports.WatchContentComponent = void 0;
var core_1 = require("@angular/core");
var graphql_tag_1 = require("graphql-tag");
var router_1 = require("@angular/router");
var WatchContentComponent = /** @class */ (function () {
    function WatchContentComponent(videoDetailsService, apollo, userService, router, activity) {
        var _this = this;
        this.videoDetailsService = videoDetailsService;
        this.apollo = apollo;
        this.userService = userService;
        this.router = router;
        this.activity = activity;
        this.comments = [];
        this.isShow = false;
        this.defaultProfile = "assets/defaultProfile.png";
        this.comment = {
            user_id: "3d9dccc5-a7ee-4257-9391-459ba59fac87",
            video_id: "0002befd-49f8-4e57-bfcd-c086c3babed2",
            parent_id: "4b621a11-fc7c-466a-a749-481620411b53",
            reply_to: "onmyway",
            comment: "For Godsake, WTH !"
        };
        this.feedback = null;
        this.likesCount = 0;
        this.dislikeCount = 0;
        this.videoDetailsService.videosValueChange.subscribe(function (value) {
            _this.getVideo(_this.videoID);
            _this.videos = value;
            _this.checkOtherFeedbacks();
            if (_this.currentUser) {
                _this.checkCurrentUserFeedBack();
            }
        });
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.router.events.subscribe(function (evt) {
            if (evt instanceof router_1.NavigationEnd) {
                // trick the Router into believing it's last link wasn't previously loaded
                _this.router.navigated = false;
                // if you need to scroll back to top, here is the right place
                window.scrollTo(0, 0);
            }
        });
        this.userService.currentUserValueChange.subscribe(function (value) {
            _this.checkCurrentUserFeedBack();
        });
    }
    WatchContentComponent.prototype.ngOnInit = function () {
        this.videoID = this.activity.snapshot.paramMap.get('id').toString();
        this.getVideo(this.videoID);
        this.getVideoComment();
        this.checkOtherFeedbacks();
        if (this.userService.getCurrentUser()) {
            this.checkCurrentUserFeedBack();
        }
        this.videos = this.videoDetailsService.getVideos();
    };
    WatchContentComponent.prototype.giveFeedback = function (feedback) {
        var isFeedbackBeforeGood = this.feedback == "like" ? true : false;
        console.log(this.feedback);
        console.log(feedback);
        if (this.currentUser) {
            if (!this.feedback) {
                console.log("inserteddd");
                this.insertFeedbackVideo(feedback);
            }
            else if (isFeedbackBeforeGood == feedback) {
                console.log("dekeete");
                this.deleteFeedbackVideo();
            }
            else {
                console.log("updateee");
                this.updateFeedbackComment(feedback);
            }
        }
    };
    WatchContentComponent.prototype.checkCurrentUserFeedBack = function () {
        var _this = this;
        this.feedback = null;
        this.currentUser = this.userService.getCurrentUser();
        var feedbacks = this.video.like_video;
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
    WatchContentComponent.prototype.checkOtherFeedbacks = function () {
        var _this = this;
        this.feedback = null;
        this.likesCount = 0;
        this.dislikeCount = 0;
        console.log("tai babi");
        console.log(this.video);
        var feedbacks = this.video.like_video;
        feedbacks.forEach(function (element) {
            if (element.status) {
                _this.likesCount++;
            }
            else {
                _this.dislikeCount++;
            }
        });
    };
    WatchContentComponent.prototype.insertFeedbackVideo = function (feedback) {
        this.apollo.mutate({
            mutation: graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["mutation createFeedBackOnVideo(\n          $user_id: String! \n          $video_id: String! \n          $status: Boolean!\n        ){\n        createFeedBackOnVideo(\n          input:{\n            user_id: $user_id,\n            video_id: $video_id,\n            status: $status\n        }\n        ){\n          status\n        }\n      }"], ["mutation createFeedBackOnVideo(\n          $user_id: String! \n          $video_id: String! \n          $status: Boolean!\n        ){\n        createFeedBackOnVideo(\n          input:{\n            user_id: $user_id,\n            video_id: $video_id,\n            status: $status\n        }\n        ){\n          status\n        }\n      }"]))),
            variables: {
                user_id: this.currentUser.id,
                video_id: this.video.id,
                status: feedback
            },
            refetchQueries: [{
                    query: exports.queryGetVideos,
                    variables: { repoFullName: 'apollographql/apollo-client' }
                }]
        }).subscribe();
    };
    WatchContentComponent.prototype.deleteFeedbackVideo = function () {
        this.apollo.mutate({
            mutation: graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["mutation deleteFeedbackOnVideo(\n          $user_id: String! \n          $video_id: String! \n        ){\n        deleteFeedbackOnVideo(\n          user_id: $user_id,\n          video_id: $video_id\n        )\n      }"], ["mutation deleteFeedbackOnVideo(\n          $user_id: String! \n          $video_id: String! \n        ){\n        deleteFeedbackOnVideo(\n          user_id: $user_id,\n          video_id: $video_id\n        )\n      }"]))),
            variables: {
                user_id: this.currentUser.id,
                video_id: this.video.id
            },
            refetchQueries: [{
                    query: exports.queryGetVideos,
                    variables: { repoFullName: 'apollographql/apollo-client' }
                }]
        }).subscribe();
    };
    WatchContentComponent.prototype.updateFeedbackComment = function (feedback) {
        this.apollo.mutate({
            mutation: graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["mutation updateFeedBackOnVideo(\n          $user_id: String! \n          $video_id: String! \n          $status: Boolean!\n        ){\n        updateFeedbackOnVideo(\n          input:{\n            user_id: $user_id,\n            video_id: $video_id,\n            status: $status\n        })\n      }"], ["mutation updateFeedBackOnVideo(\n          $user_id: String! \n          $video_id: String! \n          $status: Boolean!\n        ){\n        updateFeedbackOnVideo(\n          input:{\n            user_id: $user_id,\n            video_id: $video_id,\n            status: $status\n        })\n      }"]))),
            variables: {
                user_id: this.currentUser.id,
                video_id: this.video.id,
                status: feedback
            },
            refetchQueries: [{
                    query: exports.queryGetVideos,
                    variables: { repoFullName: 'apollographql/apollo-client' }
                }]
        }).subscribe();
    };
    WatchContentComponent.prototype.createComment = function () {
        this.comment.user_id = this.userService.getCurrentUser().id.toString();
        this.comment.video_id = this.video.id.toString();
        this.comment.parent_id = "";
        this.comment.reply_to = "";
        this.comment.comment = this.inputComment;
        console.log(this.comment);
        this.insertComment();
    };
    WatchContentComponent.prototype.insertComment = function () {
        this.apollo.mutate({
            mutation: graphql_tag_1["default"](templateObject_4 || (templateObject_4 = __makeTemplateObject(["mutation insertComment($newComment: NewComment!){\n        createComment(input: $newComment\n        ){\n          id\n        }\n      }"], ["mutation insertComment($newComment: NewComment!){\n        createComment(input: $newComment\n        ){\n          id\n        }\n      }"]))),
            variables: {
                newComment: this.comment
            },
            refetchQueries: [{
                    query: exports.queryGetCommentsByVideoId,
                    variables: { id: this.video.id, repoFullName: 'apollographql/apollo-client' }
                }]
        }).subscribe();
    };
    WatchContentComponent.prototype.getVideo = function (id) {
        this.video = this.videoDetailsService.getVideo(id);
    };
    WatchContentComponent.prototype.getVideoComment = function () {
        var _this = this;
        this.apollo.watchQuery({
            query: exports.queryGetCommentsByVideoId,
            variables: {
                id: this.video.id
            }
        }).valueChanges.subscribe(function (result) {
            _this.comments = result.data.commentsByVideoId;
            _this.length = _this.comments.length;
        });
    };
    WatchContentComponent.prototype.toggleModal = function () {
        if (!this.isShow) {
            document.getElementById("link-id").value = location.href;
            this.isShow = true;
        }
        else {
            this.isShow = false;
        }
    };
    WatchContentComponent.prototype.copyToClipBoard = function () {
        var text = (document.getElementById("link-id"));
        text.select();
        text.setSelectionRange(0, 999999);
        document.execCommand('copy');
    };
    WatchContentComponent.prototype.shareOnTwitter = function () {
        var text = (document.getElementById("link-id"));
        var post = 'https://twitter.com/intent/tweet?text=' + text.value;
        window.open(post, '_blank');
    };
    WatchContentComponent = __decorate([
        core_1.Component({
            selector: 'app-watch-content',
            templateUrl: './watch-content.component.html',
            styleUrls: ['./watch-content.component.sass']
        })
    ], WatchContentComponent);
    return WatchContentComponent;
}());
exports.WatchContentComponent = WatchContentComponent;
exports.queryGetCommentsByVideoId = graphql_tag_1["default"](templateObject_5 || (templateObject_5 = __makeTemplateObject(["query getComments($id: String!){\n    commentsByVideoId(id: $id){\n      id\n      parent_id\n      video_id\n      comment\n      reply_to\n      user{\n        id\n        name\n        profile_pict\n      }\n      created_at\n      like_comment{\n        user_id\n        status\n        comment_id\n      }\n    }\n  }"], ["query getComments($id: String!){\n    commentsByVideoId(id: $id){\n      id\n      parent_id\n      video_id\n      comment\n      reply_to\n      user{\n        id\n        name\n        profile_pict\n      }\n      created_at\n      like_comment{\n        user_id\n        status\n        comment_id\n      }\n    }\n  }"])));
exports.queryGetVideos = graphql_tag_1["default"](templateObject_6 || (templateObject_6 = __makeTemplateObject(["query getVideos{\n      videos{\n        id,\n        link,\n        title,\n        thumbnail,\n        description,\n        view,\n        created_at,\n        location{\n          id,\n          name\n        }\n        user{\n          name,\n          profile_pict\n        }\n        like_video{\n          user_id\n          video_id\n          status\n        }\n      }\n    }"], ["query getVideos{\n      videos{\n        id,\n        link,\n        title,\n        thumbnail,\n        description,\n        view,\n        created_at,\n        location{\n          id,\n          name\n        }\n        user{\n          name,\n          profile_pict\n        }\n        like_video{\n          user_id\n          video_id\n          status\n        }\n      }\n    }"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
