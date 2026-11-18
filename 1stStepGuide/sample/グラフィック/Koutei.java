import java.io.*;
import jp.co.fit.vfreport.*;

public class Koutei {
	public static void main(String[] args) {
		try {
			//svfインスタンス生成
			Svf svf = new Vrw32();

			//時間指定用座標変数
			int ret;
			String hour10 = "944";
			String hour11 = "1259";
			String hour12 = "1574";
			String hour13 = "1889";
			String hour14 = "2204";
			String hour15 = "2519";
			String hour16 = "2834";
			String hour17 = "3149";
			String hour18 = "3464";
			String hour19 = "3779";
			String hour20 = "4094";
				
			//svf処理開始
			ret = svf.VrInit("MS932");
			//出力先指定
			ret = svf.VrSetPrinter("", "PDF");
			ret = svf.VrSetSpoolFileName2("C:\\sample\\グラフィック\\行程表.pdf");
			//フォーム指定
			ret = svf.VrSetForm("C:\\sample\\グラフィック\\完成版行程表.xml", 1);
			
			//データセット
			ret = svf.VrsOut("期間", "2005年1月1日より2005年1月2日まで1泊2日");
			ret = svf.VrsOut("お客様名", "ウイングアーク友の会");
			ret = svf.VrsOut("タイトル", "カニ三昧温泉めぐりバスツアー");
			ret = svf.VrsOut("行程1", "出発");
			ret = svf.VrsOut("行程5", "市内散策");
			ret = svf.VrsOut("行程5_2", "（各自負担）");
			//行程5　開始時間、終了時間座標指定
			ret = svf.VrsOut("行程5_開始", hour13);
			ret = svf.VrsOut("行程5_終了", hour17);
			ret = svf.VrsOut("食事区分1", "夕食");
			ret = svf.VrsOut("食事区分2", "朝食");
			ret = svf.VrsOut("食事1", "ズワイガニ食べ放題コース");
			ret = svf.VrsOut("食事2", "又は、カニ会席コース（お部屋にて）");
			ret = svf.VrsOut("食事3", "和風膳（お部屋にて）");
			ret = svf.VrsOut("ホテル1", "旅館ういんぐ温泉の里");

			//１ページ出力終了
			ret = svf.VrEndPage();
			//印刷処理
			ret = svf.VrPrint();
			ret = svf.VrQuit();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
	}
}
