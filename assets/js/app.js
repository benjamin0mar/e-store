$(function(){
  menuShow();
  tabProducts();
  moveSlideBar();
  GalleryProducts();
  // GalleryProducts("#carrito");
  numberInput();
  tabInfoProduct();

  page('/', index);
  page('/producto', producto);
  page('/carrito', car);
  page();

});


function index(){
  $("#main").siblings("section").hide();
  $("#main").show();
}

function producto(){
  $("#producto").siblings("section").hide();
  $("#producto").show();
}

function car(){
  $("#carrito").siblings("section").hide();
  $("#carrito").show();
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

function moveSlideBar(){
  $(window).scroll(function(){
    var top = $(this).scrollTop();
    var topSlide = $(".side-list").offset().top
    var topFooter = $("footer").offset().top
    if(top > topSlide){
     $(".side-list").addClass("fixed");
     if(top + $(window).height() > topFooter ){
       $(".side-list").addClass("hide");
     }else{
       $(".side-list").removeClass("hide");
     }
   }else{
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
