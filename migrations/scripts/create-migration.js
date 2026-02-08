const { execSync } = require('child_process');
const { cwd } = require('process');

const main = () => {
  const migrationName = process.argv[2];

  if (!migrationName)
    throw new Error(
      'Write migration name. Example - npm run migration:create myCustomMigration',
    );
  const pathDestiny = `${cwd()}/migrations/${migrationName}`;
  const command = `npx typeorm-ts-node-commonjs migration:create ${pathDestiny}`;
  execSync(command, { stdio: 'inherit' });
};

main();
