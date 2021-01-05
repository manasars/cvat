// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { ExtendedKeyMapOptions } from 'react-hotkeys';
import { connect } from 'react-redux';

import { Canvas } from 'cvat-canvas-wrapper';
import {
    hideShowContextImage

} from 'actions/annotation-actions';
import ControlsSideBarComponent from 'components/annotation-page/standard3D-workspace/controls-side-bar/controls-side-bar';
import { ActiveControl, CombinedState } from 'reducers/interfaces';

interface StateToProps {
    canvasInstance: Canvas;
    activeControl: ActiveControl;
    keyMap: Record<string, ExtendedKeyMapOptions>;
    normalizedKeyMap: Record<string, string>;
    contextImageHide : boolean,
    loaded:boolean
}

interface DispatchToProps {
    hideShowContextImage(hide: boolean): void;

}

function mapStateToProps(state: CombinedState): StateToProps {
    const {
        annotation: {
            canvas: { instance: canvasInstance, activeControl },
            player :{ context_image:{hide:contextImageHide,loaded:loaded}},
        },
        shortcuts: { keyMap, normalizedKeyMap },
    } = state;

    return {
        canvasInstance,
        activeControl,
        normalizedKeyMap,
        keyMap,
        contextImageHide,
        loaded,
    };
}

function dispatchToProps(dispatch: any): DispatchToProps {
    return {
        hideShowContextImage(hide:boolean):void {
            dispatch(hideShowContextImage(hide));
        },

    };
}

export default connect(mapStateToProps, dispatchToProps)(ControlsSideBarComponent);
