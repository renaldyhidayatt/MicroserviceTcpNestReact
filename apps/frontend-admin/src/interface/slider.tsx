export interface Slider {
  slider_id: number;
  nama: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface SliderState {
  sliders: Slider[];
  slider: Slider | any;
  loading: boolean;
  error: any;
}

export interface UpdateSliderData {
  id: number;
  formData: FormData;
}
