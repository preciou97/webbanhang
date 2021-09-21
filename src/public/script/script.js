const headerBtn = $('.nav_button');
const navbarSearch = $('.search-btn-icon');
const inputSearchBtn = $('.input_button_search');
const inputClose = $('.input_button_close');
const productAttention = $('.product_detail_attention');
const productListImg = $('.product_img_list_img');
const searchPageBtn = $('.search_page_btn')
const searchInput = $('.search_form_hidden');
const present = $("#presentCheck");
const loginButton = $("#login_btn");
const accountIcon = $(".account_icon");
const loginIcon = $(".login_icon");
const addFavorite = $(".addFavorite");
var token = getCookie('token');


$('#deleteModal').on('shown.bs.modal', function () {
    console.log('aaaaaaa');

    let modalDeleteBtn = $('#modalDeleteBtn');
    modalDeleteBtn.click(function () {
        $.ajax({
            url: "/account/store/delete",
            type: "PATCH",
            data: {
                item: $('#deleteFormCartBtn').attr('data-id')
            },

        })

        $('#deleteModal').modal('hide');
        window.location.reload();
    })
});

if (token != "") {
    loginIcon.css('display', 'none');
} else {
    accountIcon.css('display', 'none');
}

function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


addFavorite.click(function () {
    if (token != "") {
        $.ajax({
            url: "/account/store",
            type: "POST",
            data: {
                item: $(this).attr('data-id')
            }
        })
        $(this).next().slideToggle(500);
        $(this).next().slideToggle(1500);
    } else {
        window.location.href = "/account/login"
    }


})

loginButton.click(function () {
    $.ajax({
        url: "login/check",
        type: "POST",
        data: {
            username: $('#email_input').val(),
            password: $('#password_input').val()
        }
    })
        .then(data => {
            if (data != 'failed') {
                console.log(data);

                setCookie("token", data.token, 1);
                window.location.href = "/account/loginSuccess";
            } else {
                window.location.href = "/account/loginFailed";
            }

        })


})

present.click(function () {
    var giftForm = $("#cart_product_gift_form");

    if (present.prop("checked") == true) {
        present.attr('value', '150');
        giftForm.submit();

    } else {
        present.attr('value', '0');
        giftForm.submit();
    }
})

headerBtn.click(function (e) {
    e.preventDefault();
    var navList = $('.nav-list-menu');

    navList.slideToggle(500);

})
navbarSearch.click(function (e) {
    e.preventDefault();
    accountIcon.hide();
    var body = $('.dark_pane');

    var viewSearch = $('.search_form');
    if (viewSearch.css('display') == 'none') {
        viewSearch.slideToggle(500);
        body.css("opacity", "0.3");
    } else {

        body.css("opacity", "1");
    }
})
inputSearchBtn.click(function (e) {
    var searchForm = $('.search_form_hidden');
    searchForm.attr('action', "/search")
    searchForm.submit();
})

searchPageBtn.click(function (e) {
    var searchPageForm = $('.search_page_form');
    searchPageForm.attr('action', "/search")
    searchPageForm.submit();
})

inputClose.click(function (e) {
    e.preventDefault();
    var viewSearch = $('.search_form');
    var body = $('.dark_pane');
    viewSearch.slideToggle(500);
    body.css("opacity", "1");

})

productAttention.click(function () {
    var productAttentionChild = $('.product_detail_attention_detail');

    productAttentionChild.slideToggle(500);
})

productListImg.click(function (e) {
    e.preventDefault();
    var productImg = $('.product_image_img');

    productImg.attr("src", $(this).attr("src"));
})
$(searchInput).keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        e.preventDefault();
        inputSearchBtn.click();

    }
});
