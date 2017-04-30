import { Component, OnInit } from '@angular/core';
import { NgServiceWorker } from '@angular/service-worker';
import 'isomorphic-fetch';

declare var fetch;

@Component({
    selector: 'app-sw-sandbox',
    templateUrl: './sw-sandbox.component.html',
    styleUrls: ['./sw-sandbox.component.css'],
    providers: [NgServiceWorker]
})
export class SwSandboxComponent implements OnInit {

    private swScope: string = './';
    private swUrl: string = './worker-basic.min.js';
    public isSubscribed: boolean = false;
    public hasSubscriptionActionOccurred: boolean = false;

    constructor(public sw: NgServiceWorker) {
    }

    ngOnInit() {
        this.sw.log().subscribe(message => console.log(message));
        navigator['serviceWorker']
            .getRegistration(this.swScope)
            .then(registration => {
                registration.pushManager.getSubscription().then(function(subscription) {
                    return subscription !== null;
                }).then(isSubscribedResult => {
                    // this.isSubscribed does not exist in above then, but seems to work here
                    this.isSubscribed = isSubscribedResult;
                });
            });
    }


    subscribeToPush() {
        this.hasSubscriptionActionOccurred = true;

        function urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

        const vapidPublicKey = 'BGPwmeJvcajyK7v-H3_tdESj9VwLpbO_I4oYrI4rnPlWERU2LGtrlD25oxGZ7vf0D8rJO4M0crHQ2SbhvCelahs';
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

        navigator['serviceWorker']
            .getRegistration(this.swScope)
            .then(registration => {
                registration.pushManager
                    .subscribe({ userVisibleOnly: true, applicationServerKey: convertedVapidKey })
                    .then(function(subscription) {
                        console.log(JSON.stringify(subscription));

                        return fetch("https://rss-reader.azurewebsites.net/api/WebPushSubscribe", {
                            method: "POST",
                            body: JSON.stringify({ action: 'subscribe', subscription: subscription }),
                            headers: { 'Content-Type': 'application/json' }
                        })
                            .then(response => {
                                return response.json()
                            })
                            .then(json => {
                                console.log('Subscription request answer', json)
                            })
                            .catch(error => {
                                console.log('Subscription request failed', error)
                            });
                    });

            })
            .catch(error => {
                console.log(error);
            })

    }

    unsubscribeFromPush() {
        this.hasSubscriptionActionOccurred = true;

        navigator['serviceWorker']
            .getRegistration(this.swScope)
            .then(registration => {
                registration.pushManager.getSubscription().then(function(subscription) {
                    // Use to unsubscribe from db
                    console.log(JSON.parse(JSON.stringify(subscription)).keys.auth);

                    return fetch("https://rss-reader.azurewebsites.net/api/WebPushUnsubscribe", {
                        method: "POST",
                        body: JSON.stringify({ subscription: subscription }),
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(response);
                            }

                            return response.json()
                        })
                        .then(json => {
                            console.log('Unsubscription request answer', json)
                            subscription.unsubscribe().then(success => {
                                console.log('Unsubscription successful', success)
                            }).catch(error => {
                                console.log('Unsubscription failed', error)
                            })
                        })
                        .catch(error => {
                            console.log('Unsubscription request failed', error)
                        });
                })

            })
            .catch(error => {
                console.log(error);
            })

    }


}
