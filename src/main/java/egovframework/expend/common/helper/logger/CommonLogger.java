package egovframework.expend.common.helper.logger;

import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.vo.CommonInterface.commonCode;
import org.apache.logging.log4j.LogManager;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;


@Service("CommonLogger")
public class CommonLogger {

    /* 변수정의 */
    /* 변수정의 - DAO */
    @Resource(name = "CommonLoggerDAO")
    CommonLoggerDAO dao;
    /* 변수정의 - Log */
    private org.apache.logging.log4j.Logger LOG = LogManager.getLogger(this.getClass());

    /* 로그 기록 */
    /* 로그 기록 - file */
    /* 로그 기록 - file - ERROR */
    public void CommonSetError(Exception e) {
        StringWriter sw = new StringWriter();
        e.printStackTrace(new PrintWriter(sw));
        String exceptionAsStrting = sw.toString();
        LOG.error("! [EXP] ERROR - " + exceptionAsStrting);
        e.printStackTrace();
    }

    /* 로그 기록 - file - INFO */
    public void CommonSetInfo(String message) {
        // LOG.info( "! [EXP] INFO - " + message );
    }

    /* 로그 기록 - database */
    /* 로그 기록 - database - ERROR */
    public void CommonSetErrorToDatabase(Exception e, String groupSeq, String compSeq, String moduleType) {
        /* file ERROR 기록 */
        StringWriter sw = new StringWriter();
        e.printStackTrace(new PrintWriter(sw));
        String exceptionAsStrting = sw.toString();
        // LOG.error( "! [EXP] ERROR - " + exceptionAsStrting );
        e.printStackTrace();
        /* database ERROR 기록 */
        StringBuffer exceptionAsStrtingBuffer = new StringBuffer();
        exceptionAsStrtingBuffer.append("! [EXP] ERROR - [" + moduleType + "] " + e.getMessage());
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(commonCode.groupSeq, CommonConvert.CommonGetStr(groupSeq));
        params.put(commonCode.compSeq, CommonConvert.CommonGetStr(compSeq));
        params.put(commonCode.module, CommonConvert.CommonGetStr(moduleType));
        params.put(commonCode.type, CommonConvert.CommonGetStr(commonCode.error));
        params.put(commonCode.message, CommonConvert.CommonGetStr(exceptionAsStrtingBuffer.toString()));
        dao.CommonSetLogToDatabaseInsert(params);
    }

    /* 로그 기록 - database - INFO */
    public void CommonSetInfoToDatabase(String message, String compSeq, String moduleType) {
        this.CommonSetInfoToDatabase(message, "", compSeq, moduleType);
    }

    public void CommonSetInfoToDatabase(String message, String groupSeq, String compSeq, String moduleType) {
        /* file INFO 기록 */
        // LOG.info( "! [EXP] INFO - " + message );
        /* database INFO 기록 */
        StringBuffer exceptionAsStrtingBuffer = new StringBuffer();
        exceptionAsStrtingBuffer.append("! [EXP] INFO - [" + moduleType + "] " + message);
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(commonCode.groupSeq, CommonConvert.CommonGetStr(groupSeq));
        params.put(commonCode.compSeq, CommonConvert.CommonGetStr(compSeq));
        params.put(commonCode.module, CommonConvert.CommonGetStr(moduleType));
        params.put(commonCode.type, CommonConvert.CommonGetStr(commonCode.info));
        params.put(commonCode.message, CommonConvert.CommonGetStr(exceptionAsStrtingBuffer.toString().replace("'", "")));
        dao.CommonSetLogToDatabaseInsert(params);
    }
}
