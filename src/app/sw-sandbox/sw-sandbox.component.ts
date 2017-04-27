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

    constructor(public sw: NgServiceWorker) {
    }

    ngOnInit() {
        this.sw.log().subscribe(message => console.log(message));
    }


    subscribeToPush() {

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

                console.dir(registration);

                registration.pushManager
                    .subscribe({ userVisibleOnly: true, applicationServerKey: convertedVapidKey })
                    .then(function(subscription) {

                        console.log(JSON.stringify(subscription));


                        return fetch("https://sta-notification.azurewebsites.net/api/web-push", { //https://pwa-workshop-api.herokuapp.com VS http://localhost:3000
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

        navigator['serviceWorker']
            .getRegistration(this.swScope)
            .then(registration => {

                registration.pushManager.getSubscription().then(function(subscription) {
                    subscription.unsubscribe().then(success => {
                        console.log('Unsubscription successful', success)
                    }).catch(error => {
                        console.log('Unsubscription failed', error)
                    })
                })

            })
            .catch(error => {
                console.log(error);
            })

    }


}
