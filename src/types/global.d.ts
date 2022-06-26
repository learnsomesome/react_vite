/// <reference types="react" />

// refer to https://github.com/facebook/create-react-app/blob/0ee4765c39f820e5f4820abf4bf2e47b3324da7f/packages/react-scripts/lib/react-app.d.ts#L47
declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /**
     * 请求过程是否显示 loading 动画
     */
    loading?: boolean;
  }
}
