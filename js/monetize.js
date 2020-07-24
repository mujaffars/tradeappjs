var jsLoaded=true;
var admobid={};
var isTesting=false;
var vidUnlockNext=false;
if (/(android)/i.test(navigator.userAgent)) {
    admobid={
        banner: 'ca-app-pub-3868593263837372/1966919416',
        interstitial: 'ca-app-pub-3868593263837372/6836102719',
        reward: 'ca-app-pub-3868593263837372/8357720563'
    };
} else {
    admobid={
        banner: 'ca-app-pub-3868593263837372/1966919416',
        interstitial: 'ca-app-pub-3868593263837372/6836102719',
        reward: 'ca-app-pub-3868593263837372/8357720563'
    };
}
var push;

$(function () {

    document.addEventListener('deviceready', function () {

        push=PushNotification.init({
            android: {
            },
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            },
            windows: {}
        });

        push.on('registration', function (data) {
            $('#regidinp').val(data.registrationId);
//            alert(data.registrationId);
            // data.registrationId
        });

        push.on('notification', function (data) {
            // data.message,
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
        });

        push.on('error', function (e) {
            alert(e);
            // e.message
        });


    });



    

});

function onLoad() {

    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
        document.addEventListener('deviceready', initApp, false);
    } else {
        initApp();
    }

    $('.bs-example-modal-sm').on('hidden.bs.modal', function () {
        //AdMob.removeBanner();
    })
}

function initApp() {
    if (typeof admob!=='undefined') {
        if (!AdMob) {/* alert( 'admob plugin not ready' );*/
            return;
        }
        initAd();
    }

    registerAdEvents();
}

function initAd() {

//    Appodeal.show(Appodeal.BANNER_BOTTOM);

    AdMob.setOptions({
        publisherId: admobid.banner,
        interstitialAdId: admobid.interstitial,
        bannerAtTop: false, // set to true, to put banner at top
        overlap: false, // set to true, to allow banner overlap webview
        offsetTopBar: false, // set to true to avoid ios7 status bar overlap
        isTesting: isTesting, // receiving test ad
        autoShow: false  // auto show interstitial ad when loaded
    });

    AdMob.createBannerView({
        isTesting: isTesting,
        autoShow: true,
    });

//    AdMob.prepareInterstitial({
//        interstitialAdId: admobid.interstitial,
//        autoShow: false,
//        isTesting: true,
//    })

    prepareInterstitial();

    prepareReward();

    if (!eventInitialized) {
        document.addEventListener('deviceready', function () {

            /** Listner banner **/
            document.addEventListener('admob.banner.events.LOAD_FAIL', function (event) {
                setTimeout(function () {
                    document.addEventListener('deviceready', function () {
                        prepareBanner();
                    });
                }, 3000);
            })

            /** Listener Interstitial **/
            document.addEventListener('admob.interstitial.events.LOAD_FAIL', function (event) {
                setTimeout(function () {
                    document.addEventListener('deviceready', function () {
                        prepareInterstitial();
                    });
                }, 3000);
            })

            document.addEventListener('admob.interstitial.events.LOAD', function (event) {
                // alert('Interstitial loaded');
            })

            document.addEventListener('admob.interstitial.events.CLOSE', function (event) {
                eventInitialized=true;
                document.addEventListener('deviceready', function () {
                    prepareInterstitial();
                });
            })

            document.addEventListener('admob.interstitial.events.EXIT_APP', function (event) {

            })

            /** Listener Reward **/
            document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', function (event) {
                setTimeout(function () {
                    document.addEventListener('deviceready', function () {
                        prepareReward();
                    });
                }, 10000);
            })

            document.addEventListener('admob.rewardvideo.events.LOAD', function (event) {
//                $('.divShowR').show();
            })

            document.addEventListener('admob.rewardvideo.events.REWARD', function (event) {
                if (vidUnlockNext) {
                    getSetLocalstorage('packunlockedtill', '', 'setnext');
                    pckPlaying=eval(pckPlaying+1);
                    startPack('current');
                    vidUnlockNext=false;
                } else if (adForWcoHints) {
                    wcoLocalstorage('wcoHints', 10, 'plus');
                    adForWcoHints=false;
                    $('.bs-example-modal-sm').modal('hide');
                }
                prepareReward();
            });

            document.addEventListener('admob.rewardvideo.events.CLOSE', function (event) {
                prepareReward();
            })

        })
    }
}
// optional, in case respond to events or handle error
function registerAdEvents() {

    document.addEventListener('onDismissInterstitialAd', function (event) {
        AdMob.prepareInterstitial({
            interstitialAdId: admobid.interstitial,
            autoShow: false,
            isTesting: isTesting,
        })
    })

}

function prepareBanner() {
    AdMob.createBannerView({
        isTesting: isTesting,
        autoShow: true,
    });
}

function prepareInterstitial() {
    if (typeof AdMob!=='undefined') {
        AdMob.prepareInterstitial({interstitialAdId: admobid.interstitial, autoShow: false, isTesting: isTesting});
    }
}

function showInterstitial() {
    if (typeof AdMob!=='undefined') {
        AdMob.showInterstitial();
    }
}

function prepareReward() {
    admob.rewardvideo.config({
        id: admobid.reward,
    })
    admob.rewardvideo.prepare();
}

function showReward() {
    admob.rewardvideo.show();
}

function closeModal() {
    $('.bs-example-modal-sm').modal('hide');
    $('.bs-example-modal-sm2').modal('hide');
}

function fnVidUnlockNext() {
    vidUnlockNext=true;
    showReward();
}