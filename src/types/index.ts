export interface UploadedImage {
  url: string;
  width: number;
  height: number;
}

export interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  isBehind: boolean;
}

export interface EditorState {
  image: UploadedImage | null;
  textLayers: TextLayer[];
  selectedLayerId: string | null;
  history: Array<{
    textLayers: TextLayer[];
    image: UploadedImage | null;
  }>;
} 