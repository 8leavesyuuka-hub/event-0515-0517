// ============================================================
//  Open your Senses — 自動確認メール送信スクリプト
//  設定場所: script.google.com（true.again.yuuka@gmail.com でログイン）
// ============================================================

const OWNER_EMAIL = 'true.again.yuuka@gmail.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    sendConfirmationToApplicant(data);
    sendNotificationToOwner(data);
  } catch (err) {
    Logger.log('エラー: ' + err.message);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── 申込者への確認メール ──────────────────────────────────
function sendConfirmationToApplicant(d) {
  const subject = `【Open your Senses】お申し込みありがとうございます ✦ ${d.name} 様`;

  const body =
`${d.name} 様

この度は「Open your Senses」にお申し込みいただき、
ありがとうございます。

あなたのご参加を心よりお待ちしています。

━━━━━━━━━━━━━━━━━━
▶ お申し込み内容
━━━━━━━━━━━━━━━━━━

イベント名：Open your Senses（個展＆イベントDay）
日　　　時：2026年 5月17日（日）12:00〜16:00
入　場　料：¥2,500

お選びのオプション：${d.options}
お支払い合計：${d.total_amount}
お支払い方法：${d.payment}

━━━━━━━━━━━━━━━━━━
▶ 当日について
━━━━━━━━━━━━━━━━━━

入場料に含まれるもの：
  💃 ベリーダンスショー観覧
  ☕ 1ドリンク（kojiカフェ）
  💎 accoのメッセージストーン

星読みセッションをご予約の方は、
当日スタッフまでお声がけください。
お時間の目安をご案内いたします。

━━━━━━━━━━━━━━━━━━
▶ キャンセルについて
━━━━━━━━━━━━━━━━━━

■ イベント参加のキャンセル
キャンセルご希望の場合は、5月14日（木）までに
下記メールアドレスへご連絡ください。

■ 星読みセッションのキャンセル
当日のご都合が悪くなってしまった場合は、
キャンセルではなく Zoom での鑑定に変更させていただきます。
日程はご都合に合わせて調整いたしますので、
お気軽にご連絡ください。

━━━━━━━━━━━━━━━━━━

ご不明な点はお気軽にご連絡ください。
当日、素敵な時間をご一緒できることを楽しみにしています。

✦ あなたの五感が、もっと輝きますように ✦

────────────────────
ゆうか
${OWNER_EMAIL}
────────────────────
※ このメールは自動送信です。`;

  GmailApp.sendEmail(d.email, subject, body);
}

// ── オーナーへの通知メール ────────────────────────────────
function sendNotificationToOwner(d) {
  const subject = `【OYS新規申込】${d.name} 様（${d.total_amount}）`;

  const starInfo = d.birthdate && d.birthdate !== '—'
    ? `\n【星読み情報】\n生年月日：${d.birthdate}\n出生時刻：${d.birthtime}\n出生地：${d.birthplace}\n聞きたいこと：${d.star_message}\n`
    : '';

  const body =
`新しいお申し込みがありました。

━━━━━━━━━━━━━━━━━━
お名前：${d.name}（${d.furigana}）
メール：${d.email}
電話：${d.phone}
参加人数：${d.count}
オプション：${d.options}
合計：${d.total_amount}
支払方法：${d.payment}
${starInfo}
メッセージ：${d.message}
━━━━━━━━━━━━━━━━━━`;

  GmailApp.sendEmail(OWNER_EMAIL, subject, body);
}
