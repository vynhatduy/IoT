import { Component, OnInit } from '@angular/core';
import { MapService } from '../../core/services/api/map.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  loading: boolean = true;
  areas: any[] = [];
  map: any;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.getAreas().then(() => {
      this.loadMap();
    });
  }

  getAreas() {
    this.loading = true;
    return this.mapService
      .getData()
      .then((data) => {
        this.areas = data.results;
        // console.log(this.areas);
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
      });
  }

  loadMap() {
    const latLng = new google.maps.LatLng(
      11.954770311220559,
      108.44465550590694
    );

    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Tạo các marker
    this.areas.forEach((area) => {
      this.addMarker(
        area.latitude,
        area.longitude,
        area.name,
        area.sensorLocation
      );
    });
  }

  addMarker(
    latitude: number,
    longitude: number,
    title: string,
    content: string
  ) {
    const latLng = new google.maps.LatLng(latitude, longitude);
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: title,
    });

    const infowindow = new google.maps.InfoWindow({
      content: content,
    });

    marker.addListener('click', () => {
      infowindow.open(this.map, marker);
    });
  }
}
