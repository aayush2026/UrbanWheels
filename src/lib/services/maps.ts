import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY } from '@/lib/constants/config';

class MapsService {
  private static loader: Loader | null = null;
  private static loadPromise: Promise<typeof google> | null = null;

  static initialize(): Promise<typeof google> {
    if (!this.loader) {
      this.loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });
    }

    if (!this.loadPromise) {
      this.loadPromise = this.loader.load();
    }

    return this.loadPromise;
  }

  static async getPlaceDetails(placeId: string) {
    await this.initialize();
    return new Promise((resolve, reject) => {
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      );
      
      service.getDetails(
        { placeId },
        (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) {
            resolve(result);
          } else {
            reject(status);
          }
        }
      );
    });
  }

  static async calculateRoute(origin: string, destination: string) {
    await this.initialize();
    const directionsService = new google.maps.DirectionsService();

    return directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });
  }
}

export default MapsService; 