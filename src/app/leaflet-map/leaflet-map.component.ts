import { Component, OnInit } from '@angular/core';
import { Map, LeafletMouseEvent, Icon, icon } from 'leaflet';
import * as L from 'leaflet';


@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {
  map: Map;
  geodata: any;
  private pointerIcon: Icon = icon({
    iconUrl: 'assets/leaflet/marker-icon.png',
    iconSize: [50, 51],
  });

  constructor() { }

  ngOnInit(): void {
    this.map = L.map('map', {
      center: [39.73, -104.99],
      maxZoom: 4,
    });


    this.map.on('click', (e: LeafletMouseEvent) => {
      L.popup()
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(this.map);
    });

    L.tileLayer('assets/leaflet/map_large/{z}/{x}/{y}.png').addTo(this.map);
    L.tileLayer('assets/leaflet/images/{z}/{x}/{y}.png').addTo(this.map);
    this.map.setView([0, 0], 0);
  }

  noteLocation(map: L.Map): void {
    const json = JSON.parse(this.geodata);
    L.geoJSON(json as any, {
      pointToLayer: (geoJsonPoint, latlng) => {
        this.map.setView([latlng.lat, latlng.lng], 4);
        return L.marker(latlng, { icon: this.pointerIcon });
      }
    }).addTo(map);
  }
}
