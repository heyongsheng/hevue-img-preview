import Vue from 'vue';

export interface HeVueImgPreviewOptions {
  // 预览的图片地址，多图预览时省略
  url?: string;
  // 整体背景颜色（可选）
  mainBackground?: string;
  // 控制条字体颜色（可选
  controlColor?: string;
  // 控制条背景颜色 （可选）
  controlBackground?: string;
  // 关闭图标的颜色 （可选）
  closeColor?: string;
  // 是否多图预览
  multiple?: boolean;
  // 多图预览时默认显示的图片下标
  nowImgIndex?: number;
  // 多图预览时传入的数组
  imgList?: string[];
  // 是否开启键盘控制
  keyboard?: boolean;
}

export function install (vue: typeof Vue): void;

declare module 'hevue-img-preview';
