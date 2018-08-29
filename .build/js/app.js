//  Delete movie request
$(document).ready(function() {
    $(".delete-movie").click(function(event) {
        $target = $(event.target);
        $.ajax({
            type: "DELETE",
            url: "/movies/delete/" + $target.attr("data-movie-id"),
            success: function(response) {
                $target
                    .parent()
                    .parent()
                    .remove();
                window.location.href = "/movies";
            },
            error: function(error) {
                alert("Could not delete");
                console.log(error);
            }
        });
    });
});
