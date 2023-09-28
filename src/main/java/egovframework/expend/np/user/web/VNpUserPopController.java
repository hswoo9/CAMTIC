package egovframework.expend.np.user.web;


import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.expend.common.CommonMapInterface.commonExPath;
import egovframework.expend.common.helper.convert.CommonConvert;
import egovframework.expend.common.helper.exception.CheckICUBEG20TypeException;
import egovframework.expend.common.helper.exception.NotFoundConnectionException;
import egovframework.expend.common.helper.exception.NotFoundERPEmpCdException;
import egovframework.expend.common.helper.exception.NotFoundLoginSessionException;
import egovframework.expend.common.helper.info.CommonInfo;
import egovframework.expend.common.vo.CommonInterface.commonCode;
import egovframework.expend.common.vo.ConnectionVO;
import egovframework.expend.common.vo.CustomLabelVO;
import egovframework.expend.common.vo.ResultVO;
import egovframework.expend.np.user.code.service.BNpUserCodeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Controller
public class VNpUserPopController {

    @Resource( name = "CommonInfo" )
    private CommonInfo cmInfo;

    @Resource ( name = "BNpUserCodeService" )
    private BNpUserCodeService codeService;

    /**
     * Pop View
     * 비영리 공통 코드 팝업
     */
    @RequestMapping ( "/expend/np/user/NpCommonCodePop.do" )
    public ModelAndView NpCommonCodePop ( @RequestParam Map<String, Object> params, HttpServletRequest request ) throws Exception {
        ModelAndView mv = new ModelAndView( );
        try {
            Map<String, Object> sendParam = new LinkedHashMap<String, Object>( );
            Map<String, Object> empInfo = CommonConvert.CommonGetEmpInfo( );
            Map<String, Object> tempParam = CommonConvert.CommonGetJSONToMap( params.get( "param" ).toString( ) );
            List<Map<String, Object>> commonCodeData = CommonConvert.CommonGetJSONToListMap( params.get( "data" ).toString( ) );
            /* [예외 검증] 로그인 세션 확인 */
            if ( CommonConvert.CommonGetEmpInfo( ) == null ) {
                throw new NotFoundLoginSessionException( "로그인 세션 검색 실패" );
            }
            /* [예외 검증] ERP 연결정보 조회 */
            ConnectionVO conVo = cmInfo.CommonGetConnectionInfo( CommonConvert.CommonGetStr( empInfo.get( commonCode.compSeq ) ) );
            sendParam.put( "ERPType", conVo.getErpTypeCode( ) );
            /* [예외 검증] ERP 연동 확인 */
            if ( conVo.getErpCompSeq( ) == null || conVo.getErpCompSeq( ).isEmpty( ) ) {
                throw new NotFoundConnectionException( "ERP 연동 설정을 확인하세요." );
            }
            /* [예외 검증] ERP 타입 확인 / iCUBE G20 */
            if ( CommonConvert.CommonGetStr(conVo.getErpTypeCode( )).equals( "iCUBE" ) && conVo.getG20YN( ).equals( "N" ) ) {
                throw new CheckICUBEG20TypeException( "iCUBE G20 설정확인이 필요함." );
            }
            /* [예외 검증] ERP 사번 매핑 확인 */
            if ( empInfo.get( commonCode.erpEmpSeq ) == null || empInfo.get( commonCode.erpEmpSeq ).toString( ).isEmpty( ) ) {
                throw new NotFoundERPEmpCdException( "ERP 사번 매핑이 진행되지 않음." );
            }
            /* [예외 검증] 코드 타입 파라미터 확인 */
            if ( tempParam.get( "code" ) == null || tempParam.get( "code" ).toString( ).equals( commonCode.emptyStr ) ) {
                throw new Exception( "코드 타입 미지정." );
            }
            else {
                /* 공통코드 타입 정의 */
                sendParam.put( "code", tempParam.get( "code" ).toString( ) );
            }
            /* 옵션에 따라서 팝업창 오픈 또는 바로 검색결과 리턴 */
            sendParam.put( "param", CommonConvert.CommonGetMapToJSONStr( tempParam ) );
            sendParam.put( "data", CommonConvert.CommonGetListMapToJsonArray( commonCodeData ) );
            if ( tempParam.get( "popupType" ) == null || !tempParam.get( "popupType" ).toString( ).equals( "1" ) ) {
                /* 거래처인 경우 거래처 그룹 데이터 전달 */
                if ( CommonConvert.CommonGetStr(conVo.getErpTypeCode( )).equals( "ERPiU" ) ) {
                    switch ( tempParam.get( "code" ).toString( ) ) {
                        case "tr":
                            ResultVO group1 = new ResultVO( );
                            ResultVO group2 = new ResultVO( );
                            Map<String, Object> trParamMap = new HashMap<String, Object>( );
                            trParamMap.put( "code", "TrGroup" );
                            trParamMap.put( "param", tempParam.get( "param" ) );
                            group1 = codeService.GetCommonCode( trParamMap );
                            trParamMap.put( "code", "TrGroup2" );
                            group2 = codeService.GetCommonCode( trParamMap );
                            sendParam.put( "trGroup", CommonConvert.CommonGetListMapToJson( group1.getAaData( ) ) );
                            sendParam.put( "trGroup2", CommonConvert.CommonGetListMapToJson( group2.getAaData( ) ) );
                            break;
                        default:
                            break;
                    }
                }
                else if ( CommonConvert.CommonGetStr(conVo.getErpTypeCode( )).equals( "iCUBE" ) ) {
                    switch ( tempParam.get( "code" ).toString( ) ) {
                        case "budgetlist":
                            ResultVO budgetName = new ResultVO( );
                            Map<String, Object> trParamMap = new HashMap<String, Object>( );
                            trParamMap.put( "code", "budgetName" );
                            trParamMap.put( "param", tempParam.get( "param" ) );
                            budgetName = codeService.GetCommonCode( trParamMap );
                            trParamMap.put( "code", "TrGroup2" );
                            sendParam.put( "budgetHeaderName", CommonConvert.CommonGetListMapToJsonArray( budgetName.getAaData( ) ) );
                            break;
                        default:
                            break;
                    }
                }
                /* 콜백 함수 정의 */
                sendParam.put( "callbackFunction", tempParam.get( "callbackFunction" ).toString( ) );
                mv.addObject( "ViewBag", sendParam );
                /* 명칭설정 기능 정의 */
                LoginVO loginVo = CommonConvert.CommonGetEmpVO( );
                String pCompSeq = CommonConvert.CommonGetStr( loginVo.getCompSeq( ) );
                String plangCode = CommonConvert.CommonGetStr( loginVo.getLangCode( ) );
                String pGroupSeq = CommonConvert.CommonGetStr( loginVo.getGroupSeq( ) );
                CustomLabelVO vo = cmInfo.CommonGetCustomLabelInfo( pCompSeq, plangCode, pGroupSeq );
                mv.addObject( "CL", vo.getData( ) );
                /* 공통 코드 팝업 호출 */
                mv.setViewName( commonExPath.NpUserPopPath + commonExPath.UserCommonCodePop );
            }
            else {
                /* 바로 코드 조회 */
                ResultVO result = null;
                result = codeService.GetCommonCode( tempParam );
                mv.setViewName( "jsonView" );
                mv.addObject( "result", result );
            }
        }
        catch ( NotFoundLoginSessionException ex ) {
            mv.addObject( "errMsg", ex.getMessage( ) );
            mv.setViewName( commonExPath.ErrorPagePath + commonExPath.cmErrorCheckLogin );
        }
        catch ( CheckICUBEG20TypeException ex ) {
            mv.addObject( "errMsg", ex.getMessage( ) );
            mv.setViewName( commonExPath.ErrorPagePath + commonExPath.cmErrorCheckICUBEG20Type );
        }
        catch ( NotFoundERPEmpCdException ex ) {
            mv.addObject( "errMsg", ex.getMessage( ) );
            mv.setViewName( commonExPath.ErrorPagePath + commonExPath.cmErrorCheckErpEmpCdMapping );
        }
        catch ( NotFoundConnectionException ex ) {
            mv.addObject( "errMsg", ex.getMessage( ) );
            mv.setViewName( commonExPath.ErrorPagePath + commonExPath.cmErrorCheckErpSetting );
        }
        catch ( Exception ex ) {
            mv.addObject( "errMsg", ex.getMessage( ) );
            mv.setViewName( commonExPath.ErrorPagePath + commonExPath.cmError );
        }
        return mv;
    }


}
