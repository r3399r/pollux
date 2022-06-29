import { ExtendedSpecConfig, generateSpec } from 'tsoa';
import packageJson from '../../package.json';

(async () => {
  const env = process.argv[2];

  const specOptions: ExtendedSpecConfig = {
    entryFile: 'xxx',
    specVersion: 3,
    outputDirectory: './src/doc',
    controllerPathGlobs: ['./src/**/*Controller.ts'],
    noImplicitAdditionalProperties: 'throw-on-extras',
    host: `gemini${env === 'prod' ? '' : `-${env}`}.celestialstudio.net`,
    basePath: 'api',
    name: 'Gemini API',
    specFileBaseName: 'soa',
    version: packageJson.version,
  };

  await generateSpec(specOptions);
})();
