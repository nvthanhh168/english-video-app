const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Thay thế expo-video bằng shim HTML5 trên Web để khắc phục lỗi SharedObject
  if (platform === 'web' && moduleName === 'expo-video') {
    return {
      filePath: path.resolve(__dirname, 'src/shims/expoVideoWeb.tsx'),
      type: 'sourceFile',
    };
  }
  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
