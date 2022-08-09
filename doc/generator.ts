import { ExtendedSpecConfig, generateSpec } from 'tsoa';
import packageJson from '../backend/package.json';

(async () => {
  const env = process.argv[2];

  const specOptions: ExtendedSpecConfig = {
    entryFile: 'xxx',
    specVersion: 3,
    outputDirectory: './',
    controllerPathGlobs: ['./src/**/*Controller.ts'],
    noImplicitAdditionalProperties: 'throw-on-extras',
    host: `gemini${env === 'prod' ? '' : `-${env}`}.celestialstudio.net`,
    basePath: 'api',
    name: 'Gemini API',
    specFileBaseName: 'index',
    version: packageJson.version,
  };

  await generateSpec(specOptions);
})();
