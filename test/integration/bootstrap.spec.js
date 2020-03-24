import { connect, clear, drop } from '@lykmapipo/mongoose-test-helpers';

before((done) => connect(done));

before((done) => clear(done));

after((done) => drop(done));
