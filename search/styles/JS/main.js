$(document).ready(function (e) {
    homeSlider();
    productsSlick();
    mobileTabs();
    mobileTabsClose();
    mobileMenu();
    productThumbnails();
    productLightbox();
    faqHandler();
    contactUs();
    categoryFilters();
    mobileOverlays();
    blogFunctions();
    chargeCredit();
    numberInputs();
    shareLink();
    $('.only-digits').each(function () {
        $(this).on('input', function (e) {
            return this.value = toEnglishDigits(this.value.replace(/[^\d\u06F0-\u06F90-9]+$/, ''));
        });
    });
    $('form.needs-validation').each(function () {
        $(this).validate();
    });
    $(document).tooltip({ selector: '[data-toggle=tooltip]' });
    productColorSelects();
    productRowColumn();
    fileInput();
});

function homeSlider() {
    if ($('body').hasClass('home-page')) {

        $('.carousel-inner').slick({
            vertical: window.innerWidth > 767 ? true : false,
            verticalSwiping: window.innerWidth > 767 ? true : false,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            dots: true,
            rtl: window.innerWidth > 767 ? false : true
        });
        $('.next-slide').click(function (e) {
            e.preventDefault();

            $('.carousel-inner').slick('slickNext');
        });
        $('.prev-slide').click(function (e) {
            e.preventDefault();

            $('.carousel-inner').slick('slickPrev');
        });
    }
}

function productsSlick() {
    if ($('.products-wrapper.should-slide').length && window.innerWidth > 767) {
        $('.products-wrapper.should-slide').each(function () {
            let $this = this;
            var options = {
                slidesToShow: window.innerWidth > 767 ? 5 : 1,
                rtl: true,
                arrows: false,
                slidesToScroll: 1,
            };

            $(this).slick(options);
            $(this).parent().find('.arrow-next').click(function (e) {
                e.preventDefault();

                $($this).slick('slickNext');
            });
            $(this).parent().find('.arrow-prev').click(function (e) {
                e.preventDefault();

                $($this).slick('slickPrev');
            });
        });
    }
}

function mobileTabs() {
    $('.mobile-tab-wrapper:not(.link)').click(function (e) {
        e.preventDefault();

        let targetPage = $(this).data('page-id');
        $(`#${targetPage}`).addClass('active');

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.append(overlay);
    });
}

function mobileTabsClose() {
    $('.close-page').click(function (e) {
        e.preventDefault();

        let targetPage = $(this).closest('.mobile-page');
        targetPage.removeClass('active')

        if ($('.overlay').length) {
            $('.overlay').remove();
        }
    });
}

function mobileMenu() {
    $('#mobile-menu-wrapper>.mobile-page-inner>ul>li>a').click(function () {
        let parentEl = $(this).parent();

        if (parentEl.hasClass('active')) {
            $(this).parent().removeClass('active');
            $(this).siblings('ul').fadeOut(150);
        } else {
            $(this).parent().addClass('active');
            $(this).siblings('ul').fadeIn(150);
        }
    });
}

function productThumbnails() {
    if ($('.product-thumbnails-inner').length) {
        $('.product-thumbnail').click(function (e) {
            e.preventDefault();

            $('.product-image img').attr('src', $(this).attr('data-src'));
        });

        if ($('.product-thumbnail').length > 3) {
            $('.product-thumbnails-inner').slick({
                rtl: true,
                slidesToShow: window.innerWidth > 767 ? 4 : (window.innerWidth / 110).toFixed(0),
                slidesToScroll: window.innerWidth > 767 ? 4 : 2,
            });
            $('.product-thumbnails .next-slide').click(function (e) {
                e.preventDefault();

                $('.product-thumbnails-inner').slick('slickNext');
            });
            $('.product-thumbnails .prev-slide').click(function (e) {
                e.preventDefault();

                $('.product-thumbnails-inner').slick('slickPrev');
            });
        }
    }
}

function productLightbox() {
    let iv = null;

    if ($('.product-image').length && $('.product-thumbnail').length) {
        $('.product-gallery-thumbnail').click(function (e) {
            e.preventDefault();

            $('#product-gallery__curr img').attr('src', $(this).attr('data-src'));
            iv.destroy();
            const image = document.querySelector('#product-gallery__curr img');
            iv = new ImageViewer(image, {});
        });

        $('.gallery-arrow').click(function(e){
            e.preventDefault();

            if($(this).attr('id') == 'next-slide'){
                const currentSlide = $('.product-gallery-thumbnail[data-src="'+$('#product-gallery__curr img').attr('src')+'"]').parent();
                if(!currentSlide.prev().length){
                    $('#product-gallery__curr img').attr('src', $('.product-thumbnail-outer').last().prev().find('.product-gallery-thumbnail').attr('data-src'));
                    iv.destroy();
                    const image = document.querySelector('#product-gallery__curr img');
                    iv = new ImageViewer(image, {
                        snapView:true
                    });
                }else{
                    $('#product-gallery__curr img').attr('src', currentSlide.prev().find('.product-gallery-thumbnail').attr('data-src'));
                    iv.destroy();
                    const image = document.querySelector('#product-gallery__curr img');
                    iv = new ImageViewer(image, {
                        snapView:true
                    });
                }
            }else{
                const currentSlide = $('.product-gallery-thumbnail[data-src="'+$('#product-gallery__curr img').attr('src')+'"]').parent();
                if(currentSlide.next().length != 1){
                    $('#product-gallery__curr img').attr('src', $('.product-thumbnail-outer').first().find('.product-gallery-thumbnail').attr('data-src'));
                    iv.destroy();
                    const image = document.querySelector('#product-gallery__curr img');
                    iv = new ImageViewer(image, {
                        snapView:true
                    });
                }else{
                    $('#product-gallery__curr img').attr('src', currentSlide.next().find('.product-gallery-thumbnail').length ? currentSlide.next().find('.product-gallery-thumbnail').attr('data-src') : currentSlide.prev().find('.product-gallery-thumbnail').attr('data-src'));
                    iv.destroy();
                    const image = document.querySelector('#product-gallery__curr img');
                    iv = new ImageViewer(image, {
                        snapView:true
                    });
                }
            }
        });

        $('#product-gallery .close-modal').click(function (e) {
            e.preventDefault();

            $('#product-gallery').fadeOut(200);
        });

        $('.product-image').click(function (e) {
            e.preventDefault();

            $('#product-gallery').css('opacity', '0').css('display', 'flex').animate({ opacity: 1 }, 250);
            const image = document.querySelector('#product-gallery__curr img');
            iv = new ImageViewer(image, {
                snapView:true
            });
        });
    }
}

function faqHandler() {
    if ($('body').find('.faq-wrapper').length) {
        $('.faq-wrapper').click(function (e) {
            e.preventDefault();

            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).children('.faq-inner').slideUp(250);
            } else {
                $(this).addClass('active');
                $(this).children('.faq-inner').slideDown(250);
            }
        });
    }
}

// function contactUs() {
//     if ($('body').hasClass('contact-page')) {
//         var myMap = new L.Map('gmap', {
//             key: 'web.y5I05TXGP95WtOAJv5zIEuq7726gtGL1Mt1RnZyc',
//             maptype: 'neshan',
//             poi: true,
//             traffic: false,
//             center: [35.754096, 51.392027],
//             zoom: 15,
//             zoomControl: false,
//             attributionControl: false,
//             doubleClickZoom: false,
//             boxZoom: false,
//             dragging: false
//         });
//         var marker = L.marker([35.754096, 51.392027]).addTo(myMap);
//     }
// }

// function categoryFilters(min, max, from, to, onFinish) {
//     if ($("#price-range").length) {
//         $("#price-range").ionRangeSlider({
//             skin: 'round',
//             type: "double",
//             grid: false,
//             min: min,
//             max: max,
//             from: from,
//             to: to,
//             postfix: ' تومان',
//             prettify_separator: ',',
//             onFinish: function (data) {
//                 onFinish(data);
//             },
//         });

//     }
// }

function mobileOverlays() {
    $('a.open-mobile').click(function (e) {
        e.preventDefault();

        $('#' + $(this).data('target')).fadeIn(150);
    });

    $('a.close-mobile').click(function (e) {
        e.preventDefault();

        $(this).closest('.page-mobile').fadeOut(150);
    });
}

function blogFunctions() {
    if ($('body').hasClass('blog-page')) {
        blogCarousel();
    }
}

function blogCarousel() {
    if ($('.carousel-inner').length) {
        $('.carousel-inner').slick({
            slidesToShow: 1,
            dots: true,
            rtl: true
        });
        $('.next-slide').click(function (e) {
            e.preventDefault();

            $('.carousel-inner').slick('slickNext');
        });
        $('.prev-slide').click(function (e) {
            e.preventDefault();

            $('.carousel-inner').slick('slickPrev');
        });
    }
}

// function chargeCredit() {
//     $('#open-credit-button').click(function (e) {
//         $('#open-credit').css({ display: 'flex', opacity: 0 }).animate({ opacity: 1 }, 250).delay(250).addClass('open');
//     });
//     $('#open-credit').click(function (e) {
//         if ($(this).hasClass('open')) {
//             $(this).fadeOut(250).delay(250).removeClass('open');
//         }
//     });
//     $('#open-credit-wrapper,#open-credit-wrapper *').click(function (e) {
//         e.stopPropagation();
//     });
// }
// function shareLink() {
//     $('.share-link').click(function (e) {
//         e.preventDefault();
//         var $this = this;
//         var title = $(this).data('title') || '-';
//         var url = $(this).data('url') || '-';

//         if ($(this).hasClass('active')) {
//             $(this).removeClass('active');
//             $('.share-box').remove();
//         } else {
//             $(this).addClass('active');
//             var shareBox = $('<div>', {});
//             shareBox.addClass('share-box');
//             shareBox.css({ 'max-width': '100%', 'width': '250px', 'height': 'auto', 'border-radius': '10px', 'box-shadow': '0px 15px 20px -10px rgba(0,0,0,0.1)', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center', 'top': $this.getBoundingClientRect().y + $(document).scrollTop() + 40, 'left': Math.max($this.getBoundingClientRect().x - 117.5, 15), 'position': 'absolute', 'border': '1px solid #f0f0f0', 'background': '#FFF', 'z-index': '99999999999', 'flex-direction': 'column', 'padding': '20px' });

//             var triangle = $('<span>', {});
//             triangle.css({ 'width': 0, 'height': 0, 'border-left': '6px solid transparent', 'border-right': '6px solid transparent', 'border-bottom': '6px solid #9d9d9d', 'position': 'absolute', 'left': window.innerWidth > 1024 ? 0 : $this.getBoundingClientRect().x - ($($this).width() / 2) - 3, 'right': window.innerWidth > 1024 ? '0' : 'initial', 'margin': 'auto', 'top': -6 });

//             var facebookIcon = '<a href="https://www.facebook.com/sharer/sharer.php?u=' + url + '&t=' + title + '" style="margin:0 10px;" title="" target="_blank"><svg height="18" viewBox="0 0 512 512" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m483.738281 0h-455.5c-15.597656.0078125-28.24218725 12.660156-28.238281 28.261719v455.5c.0078125 15.597656 12.660156 28.242187 28.261719 28.238281h455.476562c15.605469.003906 28.257813-12.644531 28.261719-28.25 0-.003906 0-.007812 0-.011719v-455.5c-.007812-15.597656-12.660156-28.24218725-28.261719-28.238281zm0 0" fill="#4267b2"/><path d="m353.5 512v-198h66.75l10-77.5h-76.75v-49.359375c0-22.386719 6.214844-37.640625 38.316406-37.640625h40.683594v-69.128906c-7.078125-.941406-31.363281-3.046875-59.621094-3.046875-59 0-99.378906 36-99.378906 102.140625v57.035156h-66.5v77.5h66.5v198zm0 0" fill="#fff"/></svg></a>';
//             var twitterIcon = '<a href="http://twitter.com/share?text=' + title + '&url=' + url + '" style="margin:0 10px;" title="" target="_blank"><svg version="1.1" width="18" height="18" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490.659 490.659" style="enable-background:new 0 0 490.659 490.659;" xml:space="preserve"><path style="fill:#03A9F4;" d="M487.84,92.931c-3.262-3.567-8.514-4.494-12.8-2.261c-4.406,2.002-8.964,3.65-13.632,4.928 c7.28-9.316,12.777-19.897,16.213-31.211c1.513-5.693-1.876-11.535-7.569-13.048c-3.04-0.808-6.281-0.233-8.857,1.571 c-16.219,8.777-33.458,15.52-51.328,20.075c-36.787-34.722-92.823-39.05-134.507-10.389c-32.109,21.71-49.786,59.232-46.08,97.813 c-69.603-5.931-133.642-40.422-176.896-95.275c-2.222-2.688-5.584-4.168-9.067-3.989c-3.532,0.212-6.728,2.162-8.533,5.205 c-14.68,23.997-18.933,52.944-11.776,80.149c3.67,13.978,9.961,27.132,18.539,38.763c-3.864-1.892-7.5-4.218-10.837-6.933 c-4.575-3.711-11.292-3.011-15.004,1.564c-1.54,1.899-2.382,4.269-2.383,6.714c0.634,39.467,22.306,75.588,56.832,94.72 c-4.658-0.572-9.256-1.557-13.739-2.944c-5.641-1.697-11.59,1.5-13.287,7.141c-0.74,2.461-0.567,5.107,0.487,7.451 c14.985,33.567,44.943,58.084,80.811,66.133c-34.173,19.28-73.523,27.381-112.533,23.168c-5.058-0.646-9.85,2.429-11.371,7.296 c-1.568,4.829,0.484,10.093,4.907,12.587c47.765,28.38,102.102,43.82,157.653,44.8c53.294-0.195,105.345-16.113,149.632-45.76 c84.544-56.107,137.237-156.843,129.899-246.976c18.077-13.381,33.758-29.725,46.379-48.341 C491.587,101.802,491.114,96.488,487.84,92.931z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></a>';
//             var telegramIcon = '<a href="https://telegram.me/share/url?url=' + url + '&text=' + title + '" style="margin:0 10px;" title="" target="_blank"><svg enable-background="new 0 0 24 24" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" fill="#039be5" r="12"/><path d="m5.491 11.74 11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z" fill="#fff"/></svg></a>';
//             var whatsappIcon = '<a href="whatsapp://send?text=' + title + ' ' + url + '" style="margin:0 10px;" title="" target="_blank"><svg height="22" viewBox="-1 0 512 512" width="22" xmlns="http://www.w3.org/2000/svg"><path d="m10.894531 512c-2.875 0-5.671875-1.136719-7.746093-3.234375-2.734376-2.765625-3.789063-6.78125-2.761719-10.535156l33.285156-121.546875c-20.722656-37.472656-31.648437-79.863282-31.632813-122.894532.058594-139.941406 113.941407-253.789062 253.871094-253.789062 67.871094.0273438 131.644532 26.464844 179.578125 74.433594 47.925781 47.972656 74.308594 111.742187 74.289063 179.558594-.0625 139.945312-113.945313 253.800781-253.867188 253.800781 0 0-.105468 0-.109375 0-40.871093-.015625-81.390625-9.976563-117.46875-28.84375l-124.675781 32.695312c-.914062.238281-1.84375.355469-2.761719.355469zm0 0" fill="#e5e5e5"/><path d="m10.894531 501.105469 34.46875-125.871094c-21.261719-36.839844-32.445312-78.628906-32.429687-121.441406.054687-133.933594 109.046875-242.898438 242.976562-242.898438 64.992188.027344 125.996094 25.324219 171.871094 71.238281 45.871094 45.914063 71.125 106.945313 71.101562 171.855469-.058593 133.929688-109.066406 242.910157-242.972656 242.910157-.007812 0 .003906 0 0 0h-.105468c-40.664063-.015626-80.617188-10.214844-116.105469-29.570313zm134.769531-77.75 7.378907 4.371093c31 18.398438 66.542969 28.128907 102.789062 28.148438h.078125c111.304688 0 201.898438-90.578125 201.945313-201.902344.019531-53.949218-20.964844-104.679687-59.09375-142.839844-38.132813-38.160156-88.832031-59.1875-142.777344-59.210937-111.394531 0-201.984375 90.566406-202.027344 201.886719-.015625 38.148437 10.65625 75.296875 30.875 107.445312l4.804688 7.640625-20.40625 74.5zm0 0" fill="#fff"/><path d="m19.34375 492.625 33.277344-121.519531c-20.53125-35.5625-31.324219-75.910157-31.3125-117.234375.050781-129.296875 105.273437-234.488282 234.558594-234.488282 62.75.027344 121.644531 24.449219 165.921874 68.773438 44.289063 44.324219 68.664063 103.242188 68.640626 165.898438-.054688 129.300781-105.28125 234.503906-234.550782 234.503906-.011718 0 .003906 0 0 0h-.105468c-39.253907-.015625-77.828126-9.867188-112.085938-28.539063zm0 0" fill="#64b161"/><g fill="#fff"><path d="m10.894531 501.105469 34.46875-125.871094c-21.261719-36.839844-32.445312-78.628906-32.429687-121.441406.054687-133.933594 109.046875-242.898438 242.976562-242.898438 64.992188.027344 125.996094 25.324219 171.871094 71.238281 45.871094 45.914063 71.125 106.945313 71.101562 171.855469-.058593 133.929688-109.066406 242.910157-242.972656 242.910157-.007812 0 .003906 0 0 0h-.105468c-40.664063-.015626-80.617188-10.214844-116.105469-29.570313zm134.769531-77.75 7.378907 4.371093c31 18.398438 66.542969 28.128907 102.789062 28.148438h.078125c111.304688 0 201.898438-90.578125 201.945313-201.902344.019531-53.949218-20.964844-104.679687-59.09375-142.839844-38.132813-38.160156-88.832031-59.1875-142.777344-59.210937-111.394531 0-201.984375 90.566406-202.027344 201.886719-.015625 38.148437 10.65625 75.296875 30.875 107.445312l4.804688 7.640625-20.40625 74.5zm0 0"/><path d="m195.183594 152.246094c-4.546875-10.109375-9.335938-10.3125-13.664063-10.488282-3.539062-.152343-7.589843-.144531-11.632812-.144531-4.046875 0-10.625 1.523438-16.1875 7.597657-5.566407 6.074218-21.253907 20.761718-21.253907 50.632812 0 29.875 21.757813 58.738281 24.792969 62.792969 3.035157 4.050781 42 67.308593 103.707031 91.644531 51.285157 20.226562 61.71875 16.203125 72.851563 15.191406 11.132813-1.011718 35.917969-14.6875 40.976563-28.863281 5.0625-14.175781 5.0625-26.324219 3.542968-28.867187-1.519531-2.527344-5.566406-4.046876-11.636718-7.082032-6.070313-3.035156-35.917969-17.726562-41.484376-19.75-5.566406-2.027344-9.613281-3.035156-13.660156 3.042969-4.050781 6.070313-15.675781 19.742187-19.21875 23.789063-3.542968 4.058593-7.085937 4.566406-13.15625 1.527343-6.070312-3.042969-25.625-9.449219-48.820312-30.132812-18.046875-16.089844-30.234375-35.964844-33.777344-42.042969-3.539062-6.070312-.058594-9.070312 2.667969-12.386719 4.910156-5.972656 13.148437-16.710937 15.171875-20.757812 2.023437-4.054688 1.011718-7.597657-.503906-10.636719-1.519532-3.035156-13.320313-33.058594-18.714844-45.066406zm0 0" fill-rule="evenodd"/></g></svg></a>';

//             var socials = $('<div>', {});
//             socials.css({ 'display': 'flex', 'align-items': 'center', 'justify-content': 'center', 'width': '100%' });
//             socials.append(facebookIcon, twitterIcon, telegramIcon, whatsappIcon);

//             var inputWrapper = $('<div>', {});
//             inputWrapper.css({ 'display': 'flex', 'align-items': 'center', 'justify-content': 'space-between', 'width': '100%', 'margin-top': '15px' });
//             var input = $('<input>', {});
//             input.prop('readonly', true);
//             input.css({ 'width': '100%', 'height': '40px', 'border-radius': '5px', 'border': '1px solid #f0f0f0', 'background': '#f2f2f2', 'text-align': 'left' });
//             input.val(url);
//             var copyButton = $('<a>', {});
//             copyButton.attr('href', '#');
//             copyButton.html('کپی');
//             copyButton.css({ 'margin-left': '15px', 'font-weight': '700', 'font-size': '12px' });
//             copyButton.click(function (e) {
//                 e.preventDefault();
//                 input.focus().select();
//                 document.execCommand('copy');
//                 if (!$('#share-box-message').length) {
//                     shareBox.append('<span id="share-box-message" style="color:#27ae60;font-weight:700;font-size:12px;margin-top:15px;display:block;">کپی شد!</span>');
//                 }
//                 setTimeout(function () {
//                     $('#share-box-message').slideUp(200);
//                 }, 3000);
//                 setTimeout(function () {
//                     $('#share-box-message').remove();
//                 }, 3100);
//             });

//             inputWrapper.append(copyButton, input);

//             shareBox.append(triangle, socials, inputWrapper);
//             $('body').append(shareBox);
//         }
//     });
// }

// function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// function numberInputs() {
//     $('input.number').on('keydown', function (evt) {
//         var theEvent = evt || window.event;

//         if (theEvent.type === 'paste') {
//             key = event.clipboardData.getData('text/plain');
//         } else {
//             var key = theEvent.keyCode || theEvent.which;
//             key = String.fromCharCode(key);
//         }
//         var regex = /[0-9]|\./;
//         if (!regex.test(key) && (theEvent.keyCode !== 8 || theEvent.which !== 8)) {
//             theEvent.returnValue = false;
//             if (theEvent.preventDefault) theEvent.preventDefault();
//         }
//     });
//     $('input.price-input').on('keyup',function(evt){
//         // $(this).val(numberWithCommas(evt.target.value.replace(',','')));
//     });
//     $('input.price-input').on('input',function(){
//         $(this).val(numberWithCommas($(this).val().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')));
//     });
// }

// function toEnglishDigits(str) {

//     // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
//     var e = '۰'.charCodeAt(0);
//     str = str.replace(/[۰-۹]/g, function (t) {
//         return t.charCodeAt(0) - e;
//     });

//     // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
//     e = '٠'.charCodeAt(0);
//     str = str.replace(/[٠-٩]/g, function (t) {
//         return t.charCodeAt(0) - e;
//     });
//     return str;
// }

// function productColorSelects() {
//     if ($('.color-select select').length) {
//         $('.color-select select').each(function () {
//             $(this).on('change', function (e) {
//                 if ($(this).val().trim().length && $(this).children(":selected").attr('color').trim().length) {
//                     var selectedColor = $(this).children(":selected").attr('color');
//                     $(this).siblings('.select-wrapper__color').css({ 'display': 'block', 'background': selectedColor });
//                 } else {
//                     $(this).siblings('.select-wrapper__color').css({ 'display': 'none' });
//                 }
//             });
//         });
//     }
// }

// function productRowColumn(){
//     $('.product-type').click(function(e){
//         e.preventDefault();

//         if(!$(this).hasClass('active')){
//             $('.product-type').removeClass('active');
//             $(this).addClass('active');
//             if($(this).data('target') === 'row'){
//                 $('.category-page content .col-lg-3').addClass('w-100');
//             }else{
//                 $('.category-page content .col-lg-3').removeClass('w-100');
//             }
//         }
//     });
// }

// function changeProductShowMode(mode){
//     $('.product-type').removeClass('active');
//     $('.product-type[data-target="' + mode + '"]').addClass('active');
//     if(mode === 'row'){
//         $('.category-page content .col-lg-3').addClass('w-100');
//     }else{
//         $('.category-page content .col-lg-3').removeClass('w-100');
//     }
// }

// function getCurrentProductShowMode(){
//     return $('.product-type.active').data('target');
// }

// function fileInput(){
//     $('.file-input input').on('change',function(e){
//         const fileName = e.target.files[0].name;
//         $(this).siblings('label').find('span').html(fileName);
//     });
// }
