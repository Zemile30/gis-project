import Link from "next/link";
import styles from "./page.module.css";
 
export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Filial Idarəetməsi</h1>
      <p className={styles.subtitle}>
        Aşağıdakı bölmələrdən birini seç
      </p>
 
      <div className={styles.grid}>
        <Link href="/map" className={styles.card}>
          <h2>Filialların xəritəsi →</h2>
          <p>Filialları, çatdırılma zonasını və klasterləşmiş markerləri gör.</p>
        </Link>
 
        <Link href="/route" className={styles.card}>
          <h2>Marşrut nümunəsi →</h2>
          <p>İki nöqtə arasında real yol marşrutunu izlə.</p>
        </Link>
      </div>
    </main>
  );
}
 