'use client';
import React from 'react'
import styles from './style.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function index({index, title, setModal, link}) {
    const router = useRouter();
    return (
        <>
            <div className='w-full'>
            <Link href={link} target='_blank'>
                <div onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}} className={styles.project} >
                    <h2>{title}</h2>
                    <p>Click to know more</p>
                </div>
            </Link>
            </div>
        </>
    );
}