import styles from './sugaming-ui.module.scss';

/* eslint-disable-next-line */
export interface SugamingUiProps {}

export function SugamingUi(props: SugamingUiProps) {
  return (
    <div className={styles.container}>
      <h1>Welcome to SugamingUi!</h1>
    </div>
  );
}

export default SugamingUi;
