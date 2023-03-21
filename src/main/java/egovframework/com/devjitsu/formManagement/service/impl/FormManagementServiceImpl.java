package egovframework.com.devjitsu.formManagement.service.impl;

import egovframework.com.devjitsu.formManagement.repository.FormManagementRepository;
import egovframework.com.devjitsu.formManagement.service.FormManagementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FormManagementServiceImpl implements FormManagementService {

    private static final Logger logger = LoggerFactory.getLogger(FormManagementServiceImpl.class);

    @Autowired
    private FormManagementRepository formManagementRepository;

    @Override
    public List<Map<String, Object>> getTemplateFormFile(Map<String, Object> params) {
        return formManagementRepository.getTemplateFormFile(params);
    }

    @Override
    public Map<String, Object> getDocFormInfoReqOpt(Map<String, Object> params) {
        String readerNameStr = "";
        String receiverNameStr = "";
        Map<String, Object> returnMap = new HashMap<>();

        List<Map<String, Object>> readerList = formManagementRepository.getFormReaderList(params);
        List<Map<String, Object>> receiverList = formManagementRepository.getFormReceiverList(params);


        for(Map<String, Object> map : readerList){
            if(map.get("SEQ_TYPE").equals("u")){
                readerNameStr += "," + map.get("READER_EMP_NAME") + "(" + map.get("READER_DUTY_NAME") + ")";
            }else{
                readerNameStr += "," + map.get("READER_DEPT_NAME");
            }
        }

        for(Map<String, Object> map : receiverList){
            if(map.get("SEQ_TYPE").equals("u")){
                receiverNameStr += "," + map.get("RECEIVER_EMP_NAME") + "(" + map.get("RECEIVER_DUTY_NAME") + ")";
            }else{
                receiverNameStr += "," + map.get("RECEIVER_DEPT_NAME");
            }
        }

        returnMap.put("readerName", readerNameStr == "" ? "" : readerNameStr.substring(1));
        returnMap.put("receiverName", receiverNameStr == "" ? "" : receiverNameStr.substring(1));
        returnMap.put("readerList", readerList);
        returnMap.put("receiverList", receiverList);
        returnMap.put("formInfoReqOpt", formManagementRepository.getDocFormInfoReqOpt(params));
        returnMap.put("formCustomFieldList", formManagementRepository.getFormCustomFieldList(params));

        return returnMap;
    }

    @Override
    public Map<String, Object> getFormRdRcCfList(Map<String, Object> params) {
        String readerNameStr = "";
        String receiverNameStr = "";
        Map<String, Object> returnMap = new HashMap<>();

        List<Map<String, Object>> readerList = formManagementRepository.getFormReaderList(params);
        List<Map<String, Object>> receiverList = formManagementRepository.getFormReceiverList(params);


        for(Map<String, Object> map : readerList){
            if(map.get("SEQ_TYPE").equals("u")){
                readerNameStr += "," + map.get("READER_EMP_NAME") + "(" + map.get("READER_DUTY_NAME") + ")";
            }else{
                readerNameStr += "," + map.get("READER_DEPT_NAME");
            }
        }

        for(Map<String, Object> map : receiverList){
            if(map.get("SEQ_TYPE").equals("u")){
                receiverNameStr += "," + map.get("RECEIVER_EMP_NAME") + "(" + map.get("RECEIVER_DUTY_NAME") + ")";
            }else{
                receiverNameStr += "," + map.get("RECEIVER_DEPT_NAME");
            }
        }

        returnMap.put("readerName", readerNameStr == "" ? "" : readerNameStr.substring(1));
        returnMap.put("receiverName", receiverNameStr == "" ? "" : receiverNameStr.substring(1));
        returnMap.put("readerList", readerList);
        returnMap.put("receiverList", receiverList);
        returnMap.put("formCustomFieldList", formManagementRepository.getFormCustomFieldList(params));

        return returnMap;
    }

    @Override
    public Map<String, Object> getDocFormLinkagePopUrl(Map<String, Object> params) {
        return formManagementRepository.getDocFormLinkagePopUrl(params);
    }

}
