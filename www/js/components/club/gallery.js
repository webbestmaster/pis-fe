import React, {Component} from 'react';
import cnx from '../../helper/cnx';
import Lightbox from 'react-images';
import style from './style.m.scss';
import {resolveImagePath} from '../../helper/path-x';

const appConst = require('./../../app-const.json');
const {fetchX} = require('./../../helper/fetch-x');

export default class Gallery extends Component {
    constructor() {
        super();

        const view = this;

        view.state = {
            pageData: null,
            lightboxGallery: {
                isOpen: false,
                imageIndex: 0
            }
        };
    }

    componentDidMount() {
        const view = this;
        const {props, state} = view;
        const {clubId} = props;

        fetchX(appConst.pageDataUrl.club.replace('{{clubId}}', clubId))
            .then(({data}) => {
                view.setState({
                    pageData: data
                });
            })
            .catch(console.error);
    }

    render() {
        const view = this;
        const {props, state} = view;
        const {pageData} = state;

        if (pageData === null) {
            return null;
        }

        const {images} = pageData;

        if (!images || !images['300x200'] || images['300x200'].length === 0) {
            return null;
        }

        const imagesToShow = images['300x200'];

        return <div className="hug sale hug--section">
            <h3 className="section__header">Фотогалерея</h3>

            {/* <div className={style.gallery_swiper_full_width_wrapper}>*/}
            {/* <div*/}
            {/* style={{maxWidth: imagesToShow.length * 320}}*/}
            {/* ref="swiperGallery" {...cnx('swiper-container', style.gallery_swiper_container)}>*/}
            {/* <div className="swiper-wrapper">*/}

            <div className={style.gallery_image_wrapper}>

                {imagesToShow.map((url, ii) => <div
                    onClick={() => view.setState(prevState => {
                        Object.assign(prevState.lightboxGallery, {
                            isOpen: true,
                            imageIndex: ii
                        });
                        return prevState;
                    })}
                    key={ii}
                    {...cnx('swiper-slide', style.gallery_image)}
                    style={{backgroundImage: 'url(' + resolveImagePath(url) + ')'}}
                />)}
            </div>
            {/* </div>*/}
            {/* </div>*/}
            <Lightbox
                images={images['1200x800'].map(url => ({src: resolveImagePath(url)}))}
                isOpen={state.lightboxGallery.isOpen}
                currentImage={state.lightboxGallery.imageIndex}
                onClickPrev={() => view.setState(prevState => {
                    Object.assign(prevState.lightboxGallery, {
                        imageIndex: prevState.lightboxGallery.imageIndex - 1
                    });
                    return prevState;
                })}
                onClickNext={() => view.setState(prevState => {
                    Object.assign(prevState.lightboxGallery, {
                        imageIndex: prevState.lightboxGallery.imageIndex + 1
                    });
                    return prevState;
                })}
                imageCountSeparator={' / '}
                onClose={() => view.setState(prevState => {
                    Object.assign(prevState.lightboxGallery, {
                        isOpen: false
                    });
                    return prevState;
                })}
            />
            {/* </div>*/}
        </div>;
    }
}
