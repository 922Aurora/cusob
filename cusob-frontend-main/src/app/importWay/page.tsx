'use client'
import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';
import SideBar from '@/component/SideBar';
import ImgWrapper from '@/component/ImgWrapper';
import { Radio } from 'antd';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {CONTACT_TEMPLATE} from '@/constant/cusob'
import ForgotPwModal from "@/component/ForgotPwModal";
import UploadModal from "@/component/UploadModal";

const {
  importWayContainer,
  main,
  title,
  titleLeft,
  exitBtn,
  content,
  contentTitle,
  titleText,
  continueBtn,
  wayWrapper,
  wayBox,
  active,
  radioBox,
  icon,
  radio,
  explain,
  sample,
} = styles;

const ImportWay = () => {
  const router = useRouter()
  const [way, setWay] = useState('')
  const [showUpload, setShowUpload] = useState<boolean>(false);

  // 在函数组件中声明了一个状态变量 way，并将它的初始值设置为空字符串 ''。同时，setWay 是一个函数，用于更新 way 的值。例如，你可以通过调用 setWay('new value') 来更新 way 的值为 'new value'。
  const onExit = () => {
    router.back()
  }

  const onWayBoxClick = (val: string) => {
    setWay(val)
  }
  const onContinue1 = () => {
    router.push('/importAuto')
  }
  const onContinue2 = () => {
      router.push('/importFile')
  }
  const onContinue3 = () => {
    router.push('/contactEditor')
  }
  const handleSampleClick = (event:any) => {
    event.stopPropagation();
    onSampleClick();
  };
  const onUploadOk = () => {
    setShowUpload(false)
  }

  const onUploadCancel = () => {
    setShowUpload(false)
  }

  const onSampleClick = () => {

    const a = document.createElement('a');
    a.download = 'Sample File';
    a.href = CONTACT_TEMPLATE;
    a.click();
  }

  return <div className={importWayContainer}>
    <EnteredHeader />
    <SideBar />
    <div className={main}>
      <div className={title}>
        <div className={titleLeft}>
          <a href="/contactList">Contacts</a>
          <span style={{ margin: '0 0.5em', color: '#666' }}>/</span>
          <span style={{ color: '#999999' }}>Add a contact</span>
        </div>
        {/*<div className={exitBtn} onClick={onExit}>Exit</div>*/}
      </div>
      <div className={content}>
        <div className={contentTitle}>
          <div className={titleText}>How would you like to add contacts?</div>
          {/*<div className={continueBtn} onClick={onContinue}>Continue</div>*/}
        </div>
        <div className={wayWrapper}>
          {/*<div onClick={() => onWayBoxClick('another')} className={classNames(wayBox, { [active]: way === 'another' })}>*/}
          {/*  <div className={radioBox}>*/}
          {/*    <ImgWrapper className={icon} src='/img/download_icon.png' alt='download icon' />*/}
          {/*    /!*<Radio checked={way === 'another'} className={radio} />*!/*/}
          {/*  </div>*/}
          {/*  <div className={explain}>import from another service</div>*/}
          {/*</div>*/}

          <div onClick={() => setShowUpload(true)} className={classNames(wayBox, { [active]: way === 'upload' })}>
            <div className={radioBox}>
              <ImgWrapper className={icon} src='/img/upload_icon.png' alt='upload icon' />
              {/*<Radio checked={way === 'upload'} className={radio} />*/}
            </div>
            <div className={explain}>Upload a file</div>
            <div onClick={handleSampleClick} className={sample}>Sample file</div>
          </div>
          {/*<div onClick={() => onWayBoxClick('copy')} className={classNames(wayBox, { [active]: way === 'copy' })}>*/}
          {/*  <div className={radioBox}>*/}
          {/*    <ImgWrapper className={icon} src='/img/copy_icon.png' alt='copy icon' />*/}
          {/*    /!*<Radio checked={way === 'copy'} className={radio} />*!/*/}
          {/*  </div>*/}
          {/*  <div className={explain}>Copy and paste</div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
    <UploadModal
        visible={showUpload}
        onOk={onUploadOk}
        onCancel={onUploadCancel}
    />
  </div>
};

export default ImportWay;
