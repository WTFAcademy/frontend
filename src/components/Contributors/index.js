/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import styles from './index.module.css';
import Button from '@mui/material/Button';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
    
  const { isLoading, error, data, isFetching } = useQuery(["repoData"], () =>
    axios
      .get("https://api.github.com/repos/AmazingAng/WTFSolidity/contributors")
      .then((res) => res.data)
  );

  if (isLoading) return "Loading...";
//   const [visible, setVisible] = useState(false)

  if (error) return "An error has occurred: " + error.message;

  return (
  <div className={styles.full}>
    {
        data.map((c1) =>
        <div  className={styles.pictureDiv }> 
          <a  href={c1.html_url}><img className={styles.featureSvg} alt={c1.login} src={c1.avatar_url}></img></a>
         </div>
        )
    }
  </div>
  )

}
