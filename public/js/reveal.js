$(window).scroll(function() {    
    var scroll = $(window).scrollTop();    
    if (scroll >= 600) {
    $(".float").removeClass("d-none animate__animated animate__fadeOutDown").addClass("d-block animate__animated animate__fadeInUp");
}
else{
    $(".float").removeClass("d-block animate__animated animate__fadeInUp").addClass("d-none animate__animated animate__fadeOutDown");
}
});

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();    
    if (scroll >= 1200) {
    $(".fadeup").addClass("animate__animated animate__fadeInUp d-block");
    $(".fadedown").addClass("animate__animated animate__fadeInDown d-block");
    $(".fadeup").removeClass("d-none");
    $(".fadedown").removeClass("d-none");
}
else{
    $(".fadeup").removeClass("animate__animated animate__fadeInUp d-block");
    $(".fadedown").removeClass("animate__animated animate__fadeInDown d-block");
    $(".fadeup").addClass("d-none");
    $(".fadedown").addClass("d-none");
}
});

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();    
    if (scroll >= 2100) {
    $(".send").addClass("animate__animated animate__fadeInLeft d-block");
    $(".send").removeClass("d-none");
}
else{
    $(".send").removeClass("animate__animated animate__fadeInLeft d-block");
    $(".send").addClass("d-none");
}
});

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();    
    if (scroll >= 2100) {
    $(".send").addClass("animate__animated animate__fadeInLeft d-block");
    $(".send").removeClass("d-none");
}
else{
    $(".send").removeClass("animate__animated animate__fadeInLeft d-block");
    $(".send").addClass("d-none");
}
});

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();    
    if (scroll >= 1900) {
    $(".floatSetting").addClass("d-block");
    $(".floatSetting").removeClass("d-none");
}
else{
    $(".floatSetting").addClass("d-none");
    $(".floatSetting").removeClass("d-block");
}
});

