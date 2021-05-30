let $train = $('.train'),
    trainDistance = 200;

$('[type="tel"]').mask('+7 (000) 000-00-00');

$(document).ready(function () {
    trainInit();

    $('.train').click(function () {
        scrollTo(0);
    })

    $('.burger').click(function () {
        $('body').addClass('menu-opened');
    })

    $('.close-menu').click(function () {
        $('body').removeClass('menu-opened');
    })
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
    }, 1200);
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
