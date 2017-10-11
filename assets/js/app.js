$(function(){
  movePay();
  menuShow();
  tabProducts();
  moveSlideBar();
  GalleryProducts();
  numberInput();
  tabInfoProduct();
  menuCategorySearch();
  selectList();
  openChat();
  menuAdmin();
  profileTabs(".profile_wrapper .tabs ul li",".tabs_content_profile");
  profileTabs(".auth_wrapper .tab_auth span",".auth_sign");
  profileTabs(".card_wrapper .card","#");

  page('/', index);
  page('/producto', producto);
  page('/carrito', car);
  page('/perfil', profile);
  page('/pago', pay);
  page('/ofertas', offer);
  page('/autentificacion', auth);
  page('/admin', admin);
  page();

  $(".btn-control.right").click();
  $(".btn-control.right").click();


});


function menuAdmin(){
  var showList = true;

  $(".menu_admin_wrapper ul .icons_menu_admin a").click(function(){
    if (showList == true){

      $(".admin_section").addClass("active");
      $(this).siblings("ul").addClass("show");
      showList=false;

    }else{
      $(".sub_menu_admin").removeClass("show");
      setTimeout(function(){
        $(".admin_section").removeClass("active");
      }, 150);
      showList = true;

    }
  });

}


function openChat(){
  var open = true;
  $(".button_chat i").click(function(){
    if (open == true){
      $(".chat_section_wrapper").removeClass("active");
      open=false;
    }else{
      $(".chat_section_wrapper").addClass("active");
      open = true;
    }
  });
}

function selectList(){
  var bl = true;
  $("#select_prefer").click(function(){
    if (bl == true){
      $(".list_select").addClass("show");
      bl=false;
    }else{
      $(".list_select").removeClass("show");
      bl = true;
    }
  });
  var list_prefer = [];
  $(".select_item").click(function(){
    var item =$(this).attr("name");
    if($(this).prop('checked')){
      list_prefer.push(item)
    }else {
    list_prefer.forEach(function(element,index) {
      if(item===element){
        list_prefer.splice(index, 1);
      }
    });
    }
    $("#select_prefer").val(list_prefer)
  });
}

function menuCategorySearch(){
  var ch = true;
  $("#show_search_category").click(function(){
    if (ch == true){
      $(".list_category").addClass("show");
      ch=false;
    }else{
      $(".list_category").removeClass("show");
      ch = true;
    }
  });
}

function profileTabs(tab,content){
  $(tab).click(function(){
    var indice = $(this).index();
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    $(content).removeClass("active");
    $(content).eq(indice).addClass("active");
  });
}



// NOTE: routes

function index() {routesShow("#main");}
function pay() {routesShow("#pay");}
function producto() {routesShow("#producto");}
function car() {routesShow("#carrito");}
function profile() {routesShow("#profile");}
function auth() {routesShow("#auth");}
function offer() {routesShow("#offer");}
function admin() {routesShow("#admin");}

function routesShow(id){
  $(id).siblings("section").removeClass("show_section");
  $(id).addClass("show_section");
}


function tabInfoProduct(){
  $(".tab_wrapper aside").click(function(){
    var indice = $(this).index();
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    $(".info_products").removeClass("active");
    $(".info_products").eq(indice).addClass("active");
  });
}

function numberInput(){
    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {

    var spinner = jQuery(this),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find('.quantity-up'),
      btnDown = spinner.find('.quantity-down'),
      min = input.attr('min'),
      max = input.attr('max');

    btnUp.click(function() {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

    btnDown.click(function() {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

  });
}

function GalleryProducts(){
  $(".btn-control.left").addClass("hide");
  var widthProduct = $(" .product").eq(0).outerWidth();
  var lengthProduct = $(" .product").length;
  var widthTotal = (lengthProduct) *widthProduct;
  var visibles = Math.round($(window).width()/widthProduct);
  widthTotal = (lengthProduct +1 - visibles) *widthProduct;
  var moveWidth = 0;
  var flag = true;

  $(".btn-control").click(function(){
    if(!(moveWidth >= widthTotal)){
      $(".btn-control.right").removeClass("hide");
    }else{
      $(".btn-control.right").addClass("hide");
    }
    if(moveWidth > 0){
      $(".btn-control.left").removeClass("hide");
    }else{
      $(".btn-control.left").addClass("hide");
    }
  });


  $(".btn-control.right").click(function(){
    if(flag == true){
      moveWidth = moveWidth + widthProduct;
    }
    if(!(moveWidth > widthTotal)){
      $(".new-products-wrapper").css({
        "margin-left" : -moveWidth+"px"
      })
    }else{
      flag = false;
    }
  });

  $(".btn-control.left").click(function(){
    if(moveWidth > 0){
      moveWidth = moveWidth - widthProduct;
    }
    if(!(moveWidth < 0)){
      $(".new-products-wrapper").css({
        "margin-left" : -moveWidth+"px"
      });
      flag = true;
    }

  });

}

function movePay(){
  $(window).scroll(function(){
    var top = $(this).scrollTop();
    var topPayContent = $(".pay_producto").offset().top;
    var topMenu = $(".slide-menu").offset().top;
    if(top > topPayContent ){
     $(".pay_producto_content").addClass("fixed");
     $(".pay_producto_content").css({
       "top":  (top + 30)+"px"
     })
    }else if(top < topPayContent){
      $(".pay_producto_content").removeClass("fixed");
    }
  });
}

function moveSlideBar(){
  $(window).scroll(function(){
    var topSlide = $(".side-list").offset().top;
    var top = $(this).scrollTop();
    var topFooter = $("footer").offset().top;
    var topSection = $(".menu-section").offset().top;
    if(top > topSection && top + $(window).height() < topFooter ){
     $(".side-list").addClass("fixed");
     $(".side-list section").css({
       "top":  (top)+"px"
     })
    }else if(top < topSection){
      $(".side-list").removeClass("fixed");
    }
  });
}

function tabProducts(){
  $(".products-list-wrapper").eq(0).addClass("active")
  $(".products-list-wrapper.active .product-description").addClass("show");

  $(".categories h2").click(function(){
    var indice = $(this).index();
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    $(".products-list-wrapper").siblings().removeClass("active");
    $(".products-list-wrapper").eq(indice).addClass("active")
    $(".product-description").removeClass("show");

    $(".products-list-wrapper.active .product-description").each(function( index ) {
      setTimeout(function(){
        $(".products-list-wrapper.active .product-description").eq(index).addClass("show");
      }, index*200);
    });

  });
}

function menuShow(){
  var sw = true;
  $(".car i").click(function(){
    if (sw == true){
      $(".list-productos").addClass("show");
      sw=false;
    }else{
      $(".list-productos").removeClass("show");
      sw = true;
    }
  });

  $("#see-car").click(function(){
    $(".list-productos").removeClass("show");
    sw = true;
  });

  var flag = true;
  $(window).scroll(function(){
    var top = $(this).scrollTop();
    if(top > 0){
      $("header").css({
        "position" : "fixed"
      });
    }else{
      $("header").css({
        "position" : "relative"
      });
    }
  });
  $(".menu-icon").click(function(){
    if(flag == true){
      $(".menu-icon, .menu-options").addClass("active");
      setTimeout(function(){
        $("#menu-dark").addClass("active");
      }, 250);
      flag = false;
    }else{
      $(".menu-icon, .menu-options, #menu-dark").removeClass("active");
      flag = true;
    }
  });

// NOTE: close menu

  $("#menu-dark").click(function(){
    $(".menu-icon, .menu-options, #menu-dark").removeClass("active");
    flag = true;
  });

}
