let $train = $('.train'),
    mapDelay = 1200,
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

function initPartnersSlider() {
    if ($('.partners-slider').length > 0) {
        let swiper = new Swiper(".partners-slider", {
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                600: {
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
                el: ".partners-slider .pagination",
                clickable: true
            }
        });
    }
}

function initDocumentsSlider() {
    if ($('.document-slider').length > 0) {
        let swiper = new Swiper(".document-slider", {
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                769: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 60
                }
            },
            pagination: {
                el: ".document-slider .pagination",
                clickable: true
            }
        });
    }
}

function initMainSlider() {
    if ($('.main-slider').length > 0) {
        let swiper = new Swiper(".main-slider", {
            autoplay: {
                delay: 8000,
                disableOnInteraction: true,
            },
            speed: 1800,
            slidersPerView: 1,
            pagination: {
                el: ".main-slider .main-pagination",
                clickable: true
            }
        });
    }
}

function initAboutSlider() {
    if ($('.about-slider').length > 0) {
        let about_slider = new Swiper(".about-slider", {
            lazy: true,
            breakpoints: {
                0: {
                    freeMode: false,
                    slidesPerView: 1,
                    spaceBetween: 25
                },
                500: {
                    freeMode: false,
                    slidesPerView: 2,
                    spaceBetween: 25
                },
                850: {
                    freeMode: false,
                    slidesPerView: 2,
                    spaceBetween: 25
                },
                1024: {
                    freeMode: true,
                    slidesPerView: 'auto',
                    spaceBetween: 50
                }
            },
            pagination: {
                el: ".about-slider .pagination",
                clickable: true
            },
        });
    }
}

$.fn.serializeAssoc = function () {
    let data = {};
    $.each(this.serializeArray(), function (key, obj) {
        let a = obj.name.match(/(.*?)\[(.*?)\]/);
        if (a !== null) {
            let subName = a[1];
            let subKey = a[2];

            if (!data[subName]) {
                data[subName] = [];
            }

            if (!subKey.length) {
                subKey = data[subName].length;
            }

            if (data[subName][subKey]) {
                if ($.isArray(data[subName][subKey])) {
                    data[subName][subKey].push(obj.value);
                } else {
                    data[subName][subKey] = [];
                    data[subName][subKey].push(obj.value);
                }
            } else {
                data[subName][subKey] = obj.value;
            }
        } else {
            if (data[obj.name]) {
                if ($.isArray(data[obj.name])) {
                    data[obj.name].push(obj.value);
                } else {
                    data[obj.name] = [];
                    data[obj.name].push(obj.value);
                }
            } else {
                data[obj.name] = obj.value;
            }
        }
    });
    return data;
}

$(document).ready(function () {
    trainInit();

    $(".feedback-form").submit(function (e) {
        let $this = $(this);
        $.post("/wp-admin/admin-ajax.php", $this.serialize(), function () {
            $this[0].reset();
            $.fancybox.close();
            $.fancybox.open({
                src: "#success-modal",
                type: "inline",
                touch: false
            });
            $('label.file span').html('Выбрать файл');
        })
            .fail(function () {
                $.fancybox.close();
                $.fancybox.open({
                    src: "#fail-modal",
                    type: "inline",
                    touch: false
                });
            })
        return false;
    });

    $('[name="attach"]').change(function () {
        if ($(this)[0].files.length) {
            $('label.file span').html($(this)[0].files[0].name);
        }
    });

    $(".evaluation-form").submit(function (e) {
        let $this = $(this),
            form_data = new FormData();

        if ($(this).find('[name="attach"]').length > 0) {
            let file_data = $(this).find('[name="attach"]').prop('files')[0];
            form_data.append('file', file_data);
        }

        form_data.append('action', 'evaluation_action');
        form_data.append('data', JSON.stringify($this.serializeAssoc()));

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function (data) {
                $this[0].reset();
                $.fancybox.close();
                $.fancybox.open({
                    src: "#success-modal",
                    type: "inline",
                    touch: false
                });
            },
            error: function () {
                $.fancybox.close();
                $.fancybox.open({
                    src: "#fail-modal",
                    type: "inline",
                    touch: false
                });
            }
        });
        return false;
    })

    $('.train').click(function () {
        scrollTo(0);
    })

    $('.burger').click(function () {
        $('body').addClass('menu-opened');
    })

    $('.fj button').click(function () {
        $(this).parents('.fj').toggleClass('active');
        $(this).parents('.fj').next().slideToggle(250);
    })

    $('body')
        .on('click', 'button.plus', function () {
            let price = $(this).parents('.card').find('[data-price]').attr('data-price');
            let cnt = $(this).parents('.card').find('.cnt').html();
            let max = $(this).parents('.card').find('[data-available]').attr('data-available');
            cnt = parseInt(cnt) + 1;
            if (cnt > max) return false;
            $(this).parents('.card').find('.cnt').html(cnt);
            $(this).parents('.card').find('.order-price').html(parseInt(cnt) * parseInt(price));
        })

        .on('click', 'button.minus', function () {
            let price = $(this).parents('.card').find('[data-price]').attr('data-price');
            let cnt = $(this).parents('.card').find('.cnt').html();
            cnt = parseInt(cnt) - 1;
            if (cnt < 0) return false;
            $(this).parents('.card').find('.cnt').html(cnt);
            $(this).parents('.card').find('.order-price').html(parseInt(cnt) * parseInt(price));
        })

    $('.price-tabs a').click(function (e) {
        $(this).addClass('active').siblings().removeClass('active');
        $('.price-table .table').eq($(this).index()).addClass('active').siblings().removeClass('active');
        e.preventDefault();
    })

    $('[data-link]').click(function (e) {
        let $this = $(this);
        $('.catalog-filter a').removeClass('active');
        $(this).addClass('active');
        $.post("/wp-admin/admin-ajax.php", {
            'action': 'products',
            'term_id': $this.attr('data-link')
        }, function (html) {
            $('.catalog-grid').html(html);
        });
        e.preventDefault();
    })

    $('.count-wrapper .minus').click(function () {
        let number = $(this).parent('.count-wrapper').find('input').val();
        number--;
        if (number === 0) return false;
        $(this).parent().find('input').val(number);
        // $('.product-price span').html(parseInt($('.count-wrapper input').val()) * parseInt($('[data-price]').attr('data-price')));
    })

    $('.count-wrapper .plus').click(function () {
        let number = $(this).parent('.count-wrapper').find('input').val();
        number++;
        $(this).parent().find('input').val(number);
        // $('.product-price span').html(parseInt($('.count-wrapper input').val()) * parseInt($('[data-price]').attr('data-price')));
    })

    $('.thumbnails').on('click', 'a', function () {
        $('.image-large img').attr('src', $(this).attr('href'));
        $(this).addClass('active').siblings().removeClass('active');
        return false;
    })

    $('.close-menu').click(function () {
        $('body').removeClass('menu-opened');
    })

    initMainSlider();
    initWorkSlider();
    initAboutSlider();
    initPartnersSlider();
    initDocumentsSlider();

    if ($('#map').length > 0) {
        setTimeout(function () {
            let element = document.createElement('script');
            element.type = 'text/javascript';
            element.src = '//api-maps.yandex.ru/2.0/?load=package.standard&apikey=51d373bc-ef59-4e41-8e63-3f5828620b8e&lang=ru-RU&onload=mapInit';
            document.getElementsByTagName('body')[0].appendChild(element);
        }, mapDelay);
    }
    if ($('#mini-map').length > 0) {
        setTimeout(function () {
            let element = document.createElement('script');
            element.type = 'text/javascript';
            element.src = '//api-maps.yandex.ru/2.0/?load=package.standard&apikey=51d373bc-ef59-4e41-8e63-3f5828620b8e&lang=ru-RU&onload=smallMapInit';
            document.getElementsByTagName('body')[0].appendChild(element);
        }, mapDelay);
    }

});

$(window).scroll(function () {
    trainInit();
});

function scrollTo(offset, speed) {
    // speed = speed || 500;
    // $('body, html').animate({'scrollTop': offset}, speed);
}

function trainInit() {
    if ($(document).scrollTop() >= trainDistance) {
        $train.addClass('shown')
    } else {
        $train.removeClass('shown');
    }
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

    $('.address-list .address-change_link').each(function (i, val) {
        let pin = new ymaps.Placemark([$(this).attr('data-lng'), $(this).attr('data-lat')], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'wp-content/themes/sibgals/images/marker-icon.png',
            iconImageSize: [25, 41],
            iconImageOffset: [-12, -41]
        });
        map.geoObjects.add(pin);
    })

    map.setBounds(map.geoObjects.getBounds(), {
        checkZoomRange: true,
    });
}

function smallMapInit() {
    let map = new ymaps.Map('mini-map', {
        center: [55.320605479055146, 86.04998377932002],
        zoom: 15,
        controls: ['geolocationControl']
    }, {});

    map.controls.add('zoomControl', {
        size: "small"
    });

    let pin = new ymaps.Placemark([55.320605479055146, 86.04998377932002], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'app/images/marker-icon.png',
        iconImageSize: [25, 41],
        iconImageOffset: [-12, -41]
    });
    map.geoObjects.add(pin);

    map.setBounds(map.geoObjects.getBounds(), {
        checkZoomRange: true,
    });
}
