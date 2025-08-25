import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Scenario Testing Made Simple',
    Svg: require('@site/static/img/yeti_scenario.svg').default,
    description: (
      <>
        Define real workflows
        in a few lines of Java. Readable, reusable, and CI-friendly.
      </>
    ),
  },
  {
    title: 'Reusable Endpoints & Data',
    Svg: require('@site/static/img/yeti_reusable.svg').default,
    description: (
      <>
        Register endpoints and input data once, 
        then reuse them across all your scenarios 
        without copy-pasting JSON everywhere.
      </>
    ),
  },
  {
    title: 'Works Anywhere',
    Svg: require('@site/static/img/yeti_integration.svg').default,
    description: (
      <>
        Powered by Spring WebClient, YetiFramework runs locally or in any standard Java build pipeline.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
