export interface Slider {
  slider_id: number;
  nama: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface SliderState {
  sliders: Slider[];
  loading: boolean;
  error: any;
}
