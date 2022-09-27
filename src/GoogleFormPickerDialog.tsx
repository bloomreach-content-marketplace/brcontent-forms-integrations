import React, {useEffect, useState} from "react";
import useDrivePicker from "./googlepicker";
// import useDrivePicker from 'react-google-drive-picker'


interface CmsDialogProperties {
    // ui: UiScope | undefined
    onOk: (items: Array<any>) => void
    clientId: string
    apiKey: string
}

export const GoogleFormPickerDialog = ({onOk, clientId, apiKey}: CmsDialogProperties) => {

    const [items, setItems] = useState<Array<any>>([])
    const [openPicker, authResponse] = useDrivePicker();

    const handleOpenPicker = () => {
        openPicker({
            clientId: clientId,//"765704039539-2vue79iigicloigbpnraov76cijk45fp.apps.googleusercontent.com",
            developerKey: apiKey,//"AIzaSyAqGfWhC0PaLyjXbgwLrlLyuCYPDwxSjoI",
            viewId: "FORMS",
            showUploadView: false,
            showUploadFolders: false,
            supportDrives: false,
            multiselect: false,
            origin: window.location.ancestorOrigins[0],
            // customViews: customViewsArray, // custom view
            callbackFunction: (data) => {
                if (data.action === 'cancel') {
                    console.log('User clicked cancel/close button')
                    onOk([])
                }
                if (data.action === 'picked') {
                    onOk(data.docs.map(value => {
                        return {
                            content: value,
                            embed: btoa(unescape(encodeURIComponent(`<iframe src="${value.embedUrl}" width="640" height="2354" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>`)))
                        }
                    }));
                    setItems(data.docs)
                }
            },
        })
    }

    useEffect(() => {

        setTimeout(function () {
            handleOpenPicker()
        }, 1000);

    }, [])


    return (<div>
        {items.length > 0 && <h2>preview:</h2>}
        {items.map(value => {
            return <>
                <div dangerouslySetInnerHTML={{
                    __html: `<iframe
                    src="${value.embedUrl}"
                    width="640" height="2354" frameBorder="0" marginHeight="0" marginWidth="0">Loading…
                </iframe>`
                }}/>
            </>
        })}
    </div>);
}




