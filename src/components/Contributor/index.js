import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";
import { SimpleGrid } from '@mantine/core';
import { GetContributors } from '../../utils/contributors';

export const Contributor = () => {
  const [expand, setExpend] = useState(false);
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    GetContributors()
      .then((data) => {
        console.log(data)
        setContributors(data)
      })
  }, [])

  const scrollList = () => {
    return (<div className={styles['container']}>
      <div className={styles["scroll-parent"]}>
        <div className={`${styles['scroll-element']} ${styles['primary']}`}>
          {contributors.slice(0, 19).map((user, key) => (
            // <img src={user.avatar_url} />
            <div className={styles["contri-user"]} key={key}>
              <img src={user.avatar_url} className={styles["contri-user-avatar"]} />

              <div className={styles["contri-user-info"]}>
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  <div className={styles["contri-user-name"]}>{user.login}</div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>)
  }

  const expandList = () => {
    return (
      <div>
        <SimpleGrid cols={6} className={styles.expand}>
          {contributors.map((user, key) => (
            // <img src={user.avatar_url} />
            <div className={styles["expand-all"]} key={key}>
              <img src={user.avatar_url} className={styles["contri-user-avatar"]} />
              <div className={styles["contri-user-info"]}>
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  <div className={styles["contri-user-name"]}>{user.login}</div>
                </a>
              </div>
            </div>
          ))}
        </SimpleGrid>
      </div>
    )
  }
  return (
    <section>
      <div className={styles['background']}>
        <div className={styles["site-section-title"]}>
          社区贡献者
        </div>
          {expand && expandList()}
          <div className={styles['show-list']}>
          {!expand && scrollList()}
          <div className={styles['expand-text']}>
            <a onClick={() => { setExpend(!expand) }}>
              {expand ? '收起' : '展开'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )

}
