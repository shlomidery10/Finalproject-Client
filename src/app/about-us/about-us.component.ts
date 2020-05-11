import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        function w3_open() {
            const x = document.getElementById('mySidebar');
            x.style.width = '300px';
            x.style.paddingTop = '10%';
            x.style.display = 'block';
        }

        // Close side navigation
        function w3_close() {
            document.getElementById('mySidebar').style.display = 'none';
        }

        // Used to toggle the menu on smaller screens when clicking on the menu button
        function openNav() {
            const x = document.getElementById('navDemo');
            // tslint:disable-next-line:triple-equals
            if (x.className.indexOf('w3-show') == -1) {
                x.className += ' w3-show';
            } else {
                x.className = x.className.replace(' w3-show', '');
            }
        }document.addEventListener('DOMContentLoaded', function(event) {
            document.querySelectorAll('img').forEach(function(img) {
                img.onerror = function() {this.style.display = 'none'; };
            })
        });
    }

}
