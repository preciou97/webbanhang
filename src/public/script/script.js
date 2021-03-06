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
const productDetailBtn = $(".product_detail_btn");
var token = getCookie('token');

document.addEventListener('DOMContentLoaded',function(e) {

    $.getJSON(`/collections/new-models/${$('.nav-pagi').attr("data-url")}`)
        .then(data => {
            
            $('.pagi_newmodel').html(function () {
                var html = "";
                for (var i = 0; i < data; i++) {
                    html += `<li class="page-item"><a class="page-link newmodel-pagi-link" href="/collections/new-models/page-${i+1}" data-num="${i+1}">${i + 1}</a></li>`
                }
                return html;
            })
           
          $('.newmodel-pagi-link').each(function(){
              if($(this).attr('href') == window.location.pathname){
                $(this).parent().addClass('active')
              }else{
                $(this).parent().removeClass('active')
              }
          })
           
        })
        $.getJSON(`/collections/smu/${$('.nav-pagi').attr("data-url")}`)
        .then(data => {
            $('.pagi_smu').html(function () {
                var html = "";
                for (var i = 0; i < data; i++) {
                    html += `<li class="page-item"><a class="page-link smu-pagi-link" href="/collections/smu/page-${i+1}" data-num="${i+1}">${i + 1}</a></li>`
                }
                return html;
            })
           
          $('.smu-pagi-link').each(function(){
              if($(this).attr('href') == window.location.pathname){
                $(this).parent().addClass('active')
              }else{
                $(this).parent().removeClass('active')
              }
          })
           
        })
    
       
})


    

productDetailBtn.click(function () {
    if(token != ""){
        $.ajax({
            url: '/account/addToCart',
            type: 'POST',
            data: {
                size: $('.addToCartSize option:selected').val(),
                num: $('.addToCartNum').val(),
                id: $('.addToCartId').val()
            }
        })
            .then(response => {
                if (response) {
                    var addCartFail = $('.addCartResp')
                    addCartFail.text(response)
                    addCartFail.hide();
                    addCartFail.css('color', 'red');
                    addCartFail.slideToggle(500);
    
                }
                if (response == 'OK') {
    
                    var addCartSuccess = $('.addCartResp')
                    addCartSuccess.text('???????????????????????????')
    
                    addCartSuccess.css('color', 'black')
    
                    addCartSuccess.slideToggle(3500);
                }
            })
    }else{
        window.location.href = "/account/login"
    }

})
$('#deleteModal').on('shown.bs.modal', function () {

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



$('.deleteFromCartBtn').on('click', function (e) {
    let a = $(this);
    $('#deleteModalOnCart').on('shown.bs.modal', function () {
        $('#modalDeleteOnCartBtn').click(function () {
            $.ajax({
                url: "/account/cart/delete",
                type: "PATCH",
                data: {
                    size: a.attr('data-size'),
                    num: a.attr('data-num'),
                    item: a.attr('data-id')
                }

            })
            $('#deleteModalOnCart').modal('hide');
            window.location.reload();
        })


    })
})

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

$('#password_input').keypress(function (e) {
    var key = e.which;
    if (key == 13)  // the enter key code
    {
        loginButton.click();
        return false;
    }
});

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





present.click(function (e) {
    var a = $('.total_cost').text();
    if (present.is(":checked")) {

        var plus = parseInt(a) + 150;
        $('.total_cost').html(plus + '???');
    } else {
        var plus = parseInt(a) - 150;
        $('.total_cost').html(plus + '???');
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
