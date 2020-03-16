package com.reactnativecommunity.segmentedcontrol

import android.content.Context
import android.view.LayoutInflater
import android.widget.RadioButton
import android.widget.RadioGroup
import android.util.Log
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class RNCSegmentedControlManager : SimpleViewManager<RNCSegmentedControl>() {
    override fun getName(): String {
        return REACT_CLASS
    }
    
    private lateinit var context: Context;

    public override fun createViewInstance(reactContext: ThemedReactContext): RNCSegmentedControl {
        context = reactContext;
        return RNCSegmentedControl(reactContext)
    }

    protected override fun addEventEmitters(reactContext: ThemedReactContext, view: RNCSegmentedControl){
        view.setOnCheckedChangeListener(
            RadioGroup.OnCheckedChangeListener { group, checkedId ->
                Log.d(REACT_CLASS,"checked: " + checkedId.toString())
            }
        )
    }

    @ReactProp(name = "values")
    fun setChildText(view: RNCSegmentedControl, data: ReadableArray) {
        val childCount = data.size()
        for (index in 0 until childCount) {
            val child :RadioButton= LayoutInflater.from(context).inflate(R.layout.radio_button, null) as RadioButton;
            child.setText(data.getString(index));
            view.addView(child);
        }
    }

    @ReactProp(name = "selectedIndex")
    fun setSelectedChild(view: RNCSegmentedControl, index: Int?) {
        if (index != null) {
            val child = view.getChildAt(index);
            val numChild = view.getChildCount();
            Log.d(REACT_CLASS,"ChildCount: "+numChild.toString())
            Log.d(REACT_CLASS,"SelectedIndex: "+index.toString())
            
            if (child != null) {
                Log.d(REACT_CLASS,child.toString())
                val radioButton = child as RadioButton
                radioButton.setChecked(true)    
            }
            
        }
    }

    @ReactProp(name = "tintColor", customType = "Color")
    fun setTintColor(view: RNCSegmentedControl, tintColor: Int?) {
        if (tintColor != null) {
            view.setTintColor(tintColor)
        }
    }

    @ReactProp(name = "activeTextColor", customType = "Color")
    fun setActiveTextColor(view: RNCSegmentedControl, activeTextColor: Int?) {
        if (activeTextColor != null) {
            view.setActiveTextColor(activeTextColor)
        }
    }

    companion object {
        val REACT_CLASS = "RNCSegmentedControl"
    }
}
