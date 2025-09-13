import styles from './page.module.scss';

export const metadata = {
  title: 'About',
  descriptions: 'about AMEOWZON.ng',
};
export default function GreetingPage() {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>About Us</h2>

      <p className={styles.comment}>
        Hello! We’re AMEOWZON.ng, your go-to place for adding a little fun and a
        little convenience to everyday life. Our team includes real
        cats—sometimes they “help” by walking across keyboards during
        meetings—but we believe that a bit of playful chaos sparks the best
        ideas.
      </p>

      <h2 className={styles.title}>Our Philosophy</h2>

      <p className={styles.comment}>
        We care about quality and design. Just like cats carefully choose the
        perfect nap spot, we believe everyday items should feel just right.
        That’s why we handpick products that fit seamlessly into your
        life—always with a cat-approved touch.
      </p>

      <h2 className={styles.title}>Our Team</h2>

      <p className={styles.comment}>
        Our team may be small, but our ideas are limitless. With a cat hammock
        in the office corner, inspiration often comes from our feline friends.
        “Think like you play, relax like you nap”—that’s our motto.
      </p>
      <h2 className={styles.title}>Closing Message</h2>

      <p className={styles.comment}>
        We aim to bring a little joy and a little comfort to your everyday. And
        if cats could leave product reviews, we’re pretty sure they’d say:
        “Purr-fect!”
      </p>
    </div>
  );
}
