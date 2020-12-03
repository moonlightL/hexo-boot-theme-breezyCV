let CommentManager = (function ($) {

    let CommentManager = {
        init: function (postId, comment) {
            CommentManager.initComment(postId, comment);
            CommentManager.bindEvent(postId);
        },
        initComment: function (postId, comment) {
            $("#comment-container").BeautyComment({
                title: "评论",
                subTitle: "最新评论",
                baseUrl: "/admin/assets/custom/",
                listUrl: "/commentList.json",
                sendUrl: "/auth/sendComment.json",
                canComment: comment,
                ajaxParams: {postId: postId, pageNum: 1, pageSize: 10},
                listHandler: function (resp) {
                    return {
                        totalNum: resp.data.totalNum,
                        commentList: resp.data.commentList,
                        commentShowType: resp.data.commentShowType
                    }
                },
                sendHandler: function (resp) {
                    return {
                        success: resp.success,
                        message: resp.message
                    };
                }
            });
        },
        bindEvent: function (postId) {
            let toTop = $("#toTop");
            $(".single-page-content").scroll(function(e) {
                let scrollTop = $(this).scrollTop();
                if (scrollTop > 500) {
                    toTop.removeClass("hidden");
                } else {
                    if (!toTop.hasClass("hidden")) {
                        toTop.addClass("hidden");
                    }
                }
            });
            toTop.on("click",function() {
                $('.single-page-content').animate({
                    scrollTop: $('html').offset().top
                }, 500);
            });

            // 点赞
            $("#priseBtn").on("click",function () {
                if (sessionStorage.getItem("hasPrize" + postId)) {
                    return;
                }

                $.post("/praisePost/" + postId, null, function (resp) {
                    if (resp.success) {
                        $("#prizeCount").text(resp.data);
                        sessionStorage.setItem("hasPrize" + postId, "y");
                    }
                },"json");
            });
        }
    };

    return {
        init: CommentManager.init
    }

})(jQuery);