package com.reactnativecommunity.segmentedcontrol;

import android.widget.RadioGroup
import android.util.AttributeSet
import android.content.Context
import android.util.Log

class RNCSegmentedControl : RadioGroup {
    constructor(context: Context) : this(context, null) {
    }

    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
        init()
    }

    private fun init () {
        orientation = HORIZONTAL
        Log.d(REACT_CLASS,"Init: SegmentedControl Init") //TODO: Remove on publish
    }

    public fun setTintColor(tintColor: Int) {
    }

    public fun setActiveTextColor(activeTextColor: Int) {
    }

    protected override fun onFinishInflate() {
        super.onFinishInflate();
        update()
    }

    private fun update () {
        val childCount = super.getChildCount();
        Log.d(REACT_CLASS,"ChildCount: "+childCount.toString()) //TODO: Remove on publish
    }
    // For Logging
    companion object {
        val REACT_CLASS = "RNCSegmentedControl"
    }
}
