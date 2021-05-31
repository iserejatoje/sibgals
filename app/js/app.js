let $train = $('.train'),
    mapDelay = 1100,
    trainDistance = 200;

$('[type="tel"]').mask('+7 (000) 000-00-00');

function initWorkSlider() {
    if ($('.work-slider').length > 0) {
        let swiper = new Swiper(".work-slider", {
            speed: 600,
            watchSlidesVisibility: true,
            preloadImages: false,
            lazy: true,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                500: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                850: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 60
                }
            },
            pagination: {
                el: ".work-slider .pagination",
                clickable: true
            },
        });
    }
}

$(document).ready(function () {
    trainInit();

    $('.train').click(function () {
        scrollTo(0);
    })

    $('.burger').click(function () {
        $('body').addClass('menu-opened');
    })

    $('.minus').click(function () {
        let number = $(this).parent('.count-wrapper').find('input').val();
        number--;
        if (number === 0) return false;
        $(this).parent().find('input').val(number);
    })

    $('.plus').click(function () {
        let number = $(this).parent('.count-wrapper').find('input').val();
        number++;
        $(this).parent().find('input').val(number);
    })

    $('.thumbnails').on('click', 'a', function () {
        $('.image-large img').attr('src', $(this).attr('href'));
        $(this).addClass('active').siblings().removeClass('active');
        return false;
    })

    $('.close-menu').click(function () {
        $('body').removeClass('menu-opened');
    })

    initWorkSlider();
});

$(window).scroll(function () {
    trainInit();
});

function scrollTo(offset, speed) {
    speed = speed || 500;
    $('body, html').animate({'scrollTop': offset}, speed);
}

function trainInit() {
    if ($(document).scrollTop() >= trainDistance) {
        $train.addClass('shown')
    } else {
        $train.removeClass('shown');
    }
}

if ($('#map').length > 0) {
    setTimeout(function () {
        let element = document.createElement('script');
        element.type = 'text/javascript';
        element.src = '//api-maps.yandex.ru/2.0/?load=package.standard&apikey=51d373bc-ef59-4e41-8e63-3f5828620b8e&lang=ru-RU&onload=mapInit';
        document.getElementsByTagName('body')[0].appendChild(element);
    }, mapDelay);
}

function mapInit() {
    let map = new ymaps.Map('map', {
        center: [55.320605479055146, 86.04998377932002],
        zoom: 15,
        controls: ['geolocationControl']
    }, {});

    map.controls.add('zoomControl', {
        size: "small"
    });

    $('.address-change_link').on('click', function (e) {
        map.setCenter([$(this).attr('data-lng'), $(this).attr('data-lat')], 16, {
            checkZoomRange: true
        });
        scrollTo($('#map').offset().top - 25);
        e.preventDefault();
    });

    let pin_1 = new ymaps.Placemark([55.320605479055146, 86.04998377932002], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'app/images/marker-icon.png',
        iconImageSize: [25, 41],
        iconImageOffset: [-12, -41]
    });

    let pin_2 = new ymaps.Placemark([55.35838779594271, 86.04875323345156], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'app/images/marker-icon.png',
        iconImageSize: [25, 41],
        iconImageOffset: [-12, -41]
    });

    let pin_3 = new ymaps.Placemark([55.341848, 86.058083], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'app/images/marker-icon.png',
        iconImageSize: [25, 41],
        iconImageOffset: [-12, -41]
    });

    let pin_4 = new ymaps.Placemark([55.32229208059201, 86.0714648967139], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'app/images/marker-icon.png',
        iconImageSize: [25, 41],
        iconImageOffset: [-12, -41]
    });


    let pin_5 = new ymaps.Placemark([55.39322663608993, 85.99292563488699], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'app/images/marker-icon.png',
        iconImageSize: [25, 41],
        iconImageOffset: [-12, -41]
    });

    map.geoObjects.add(pin_1);
    map.geoObjects.add(pin_2);
    map.geoObjects.add(pin_3);
    map.geoObjects.add(pin_4);
    map.geoObjects.add(pin_5);

    map.setBounds(map.geoObjects.getBounds(), {
        checkZoomRange: true,
    });
}
