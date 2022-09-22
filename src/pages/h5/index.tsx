import { WebView } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";

const H5 = () => {
  const router = useRouter();
  return <WebView src={decodeURIComponent(router.params?.url as string) || ""} />;
};

export default H5;