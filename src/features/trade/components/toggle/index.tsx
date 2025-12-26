import styles from './toggle.module.scss';

type Props = {
  val: string;
  vals: { title: string; onClick: () => void }[];
};

export const Toggle = ({ val, vals }: Props) => (
  <div className={styles.toggle}>
    {vals.map(({ title, onClick }) => (
      <button
        className={`${styles.button} ${title === val ? styles.active : ''}`}
        onClick={onClick}
      >
        {title}
      </button>
    ))}
  </div>
);
